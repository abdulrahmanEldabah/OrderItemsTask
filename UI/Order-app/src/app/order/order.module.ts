import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderItemFormComponent } from './components/order-item-form/order-item-form.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

@NgModule({
  declarations: [
    OrderFormComponent,
    OrderItemFormComponent,  // ✅ add this
    OrderSummaryComponent    // ✅ add this
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    OrderFormComponent  // This makes the component available to other modules
  ]
})
export class OrderModule { }