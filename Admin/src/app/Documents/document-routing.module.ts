import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TabledocComponent } from './tabledoc/tabledoc.component';


const routes: Routes = [
  {
    path: 'upload/:id', component:  TabledocComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
