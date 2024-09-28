import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserTableComponent } from './usertable/usertable.component';
import { UiSwitchModule } from 'ngx-ui-switch';

const routes: Routes = [
  {
    path: 'usertable',
    component: UserTableComponent,
 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
