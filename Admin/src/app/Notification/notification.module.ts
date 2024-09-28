import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNotifComponent } from './add-notif/add-notif.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgForm } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button'; // For step buttons
import { NotificationRoutingModule } from './notification-routing.module';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { TablenotifComponent } from './tablenotif/tablenotif.component';
// FlatPicker
import { FlatpickrModule } from 'angularx-flatpickr';

// Bootstrap Component
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { EditnotifComponent } from './editnotif/editnotif.component';
@NgModule({
  declarations: [
    AddNotifComponent,
    TablenotifComponent,
    EditnotifComponent
  ],
  imports: [

    CommonModule,
    MatStepperModule,
    MatButtonModule,
    CdkStepperModule,
    NgStepperModule,

    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NotificationRoutingModule,
    FlatpickrModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,

  ]
})
export class NotificationModule { }
