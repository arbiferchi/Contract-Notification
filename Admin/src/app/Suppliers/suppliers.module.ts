import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableSupplierComponent } from './table-supplier/table-supplier.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';
import { SupplierComponent } from './supplier/supplier.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuppliersRoutingModule } from './suppliers-routing.module';
@NgModule({
  declarations: [
    TableSupplierComponent,
    SupplierComponent,
  ],
  imports: [
    CommonModule,
    CdkStepperModule,
    NgStepperModule,
    FormsModule,
    ReactiveFormsModule,
    SuppliersRoutingModule,

  ]
})
export class SuppliersModule { }
