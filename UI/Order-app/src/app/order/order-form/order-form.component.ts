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

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getItems().subscribe(res => this.items = res);
    this.orderService.getOrders().subscribe(res => this.savedOrders = res);
  }

  onItemAdded(item: OrderItem) {
    this.orderItems.push(item);
  }

  onOrderSubmitted(order: Order) {
    this.orderService.addOrder(order).subscribe(res => {
      this.savedOrders.push(res);
      this.orderItems = [];
    });
  }
}
