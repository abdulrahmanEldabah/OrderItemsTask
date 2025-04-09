import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Item {
  id: number;
  name: string;
  price: number;
}

export interface OrderItem {
  itemId: number;
  itemName: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Order {
  id?: number;
  orderNumber: string;
  orderItems: OrderItem[];
  totalPrice?: number;
}

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  private apiUrl = 'https://localhost:7086/api';

  constructor(private http: HttpClient) {}
  
  getSavedOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders/saved`);
  }
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/items`);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/orders`);
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orders`, order);
  }

  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/orders/${orderId}`);
  }
}
