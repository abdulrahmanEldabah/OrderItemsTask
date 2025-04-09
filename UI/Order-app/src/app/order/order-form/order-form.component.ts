import { Component, OnInit } from '@angular/core';
import { OrderService, Item, OrderItem, Order } from 'src/app/order/services/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  items: Item[] = [];
  orderItems: OrderItem[] = [];
  savedOrders: Order[] = [];
  orderForm: FormGroup;

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder
  ) {
    this.orderForm = this.fb.group({
      itemId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadItems();
    this.loadOrders();
  }

  loadItems() {
    this.orderService.getItems().subscribe(res => {
      this.items = res;
    });
  }

  loadOrders() {
    this.orderService.getOrders().subscribe(res => {
      this.savedOrders = res;
    });
  }

  addItemToOrder() {
    if (this.orderForm.invalid) return;

    const itemId = Number(this.orderForm.value.itemId);
    const item = this.items.find(i => i.id === itemId);
    if (!item) return;

    const orderItem: OrderItem = {
      itemId: item.id,
      itemName: item.name,
      price: item.price,
      quantity: this.orderForm.value.quantity,
      total: item.price * this.orderForm.value.quantity
    };

    this.orderItems.push(orderItem);
    this.orderForm.reset({ itemId: null, quantity: 1 });
  }

  submitOrder() {
    if (this.orderItems.length === 0) return;

    const order: Order = {
      orderNumber: 'ORD-' + Math.floor(Math.random() * 1000000),
      orderItems: this.orderItems,
      totalPrice: this.orderItems.reduce((sum, item) => sum + item.total, 0)
    };

    this.orderService.addOrder(order).subscribe(res => {
      this.savedOrders.push(res);
      this.orderItems = [];
    });
  }
}
