import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item, OrderItem } from 'src/app/order/services/order.service';

@Component({
  selector: 'app-order-item-form',
  styleUrls: ['./order-item-form.component.css'],
  templateUrl: './order-item-form.component.html',
})
export class OrderItemFormComponent implements OnInit {
  @Input() items: Item[] = [];
  @Output() itemAdded = new EventEmitter<OrderItem>();

  orderForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      itemId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    // Debug log to ensure form is initialized
    console.log(this.orderForm);
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

    this.itemAdded.emit(orderItem);
    this.orderForm.reset({ itemId: null, quantity: 1 });
  }
}