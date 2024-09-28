import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListContratComponent } from './list-contrat/list-contrat.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// page Route
import { SharedModule } from 'src/app/shared/shared.module';

// Count To
import { CountUpModule } from 'ngx-countup';

// Mask
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

// FlatPicker
import { FlatpickrModule } from 'angularx-flatpickr';

// Bootstrap Component
import { PaginationModule } from 'ngx-bootstrap/pagination';
  import { ModalModule } from 'ngx-bootstrap/modal';
  import { AddContratComponent } from './add-contrat/add-contrat.component';
  import { ContratRoutingModule } from './contrat-routing.module';
  import { NgForm } from '@angular/forms';
  import { MatStepper } from '@angular/material/stepper';
  import { CdkStepperModule } from '@angular/cdk/stepper';
  import { NgStepperModule } from 'angular-ng-stepper';
  import { MatStepperModule } from '@angular/material/stepper';
  import { MatButtonModule } from '@angular/material/button'; // For step buttons
  import { ViewContratComponent } from './view-contrat/view-contrat.component';
  import { EditContratComponent } from './edit-contrat/edit-contrat.component';
@NgModule({
  declarations: [
    ListContratComponent,
    AddContratComponent,
    ViewContratComponent,
    EditContratComponent
  ],
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    CdkStepperModule,
    NgStepperModule,
    SharedModule,
    CountUpModule,
    FlatpickrModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ContratRoutingModule,

  ]
})
export class ContratModule { }
