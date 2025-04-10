import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OrderItem, Order } from 'src/app/order/services/order.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
})
export class OrderSummaryComponent {
  @Input() orderItems: OrderItem[] = [];
  @Input() savedOrders: Order[] = [];
  @Output() orderSubmitted = new EventEmitter<Order>();

  submitOrder() {
    if (!this.orderItems.length) return;

    const order: Order = {
      orderNumber: 'ORD-' + Math.floor(Math.random() * 1000000),
      orderItems: [...this.orderItems],
      totalPrice: this.orderItems.reduce((sum, item) => sum + item.total, 0)
    };

    this.orderSubmitted.emit(order);
  }
  deleteItem(index: number) {
    this.orderItems.splice(index, 1);
  }
  clearAllItems() {
    this.orderItems = [];
  }
}
