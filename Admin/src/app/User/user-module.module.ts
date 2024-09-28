import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './usertable/usertable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { UiSwitchModule } from 'ngx-ui-switch';

@NgModule({
  declarations: [
    UserTableComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    UiSwitchModule,

  ]
})
export class UserModuleModule { }
