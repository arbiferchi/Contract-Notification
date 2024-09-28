import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableSupplierComponent } from './table-supplier/table-supplier.component';
import { SupplierComponent } from './supplier/supplier.component';
// Component


const routes: Routes = [
  {
    path: 'tablesupplier',
    component: TableSupplierComponent
 
  },
  {
    path: 'addsupplier',
    component: SupplierComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliersRoutingModule { }
