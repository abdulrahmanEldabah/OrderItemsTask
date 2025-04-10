import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item, OrderItem } from 'src/app/order/services/order.service';

@Component({
  selector: 'app-order-item-form',
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

  ngOnInit(): void {}

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
