import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabledocComponent } from './tabledoc/tabledoc.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SimplebarAngularComponent } from 'simplebar-angular';
import { SimplebarAngularModule } from 'simplebar-angular';

// Calendar package
import { FullCalendarModule } from '@fullcalendar/angular';

// Count To
import { CountUpModule } from 'ngx-countup';

// Ck Editer
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

// lord-icon
import lottie from 'lottie-web';
import { defineElement } from "@lordicon/element";

// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';

// Emoji Picker
import { PickerModule } from '@ctrl/ngx-emoji-mart';

// dropzone
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

//  Drag and drop
import { DndModule } from 'ngx-drag-drop';

// chart

// Drag-Drop
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';

// Bootstrap Component
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AlertModule } from 'ngx-bootstrap/alert';
import { DocumentRoutingModule } from './document-routing.module';
// Page Route
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    TabledocComponent,
  ],
  imports: [

    DocumentRoutingModule,
    CommonModule,
    DropzoneModule,
    NgApexchartsModule,
    CommonModule,
    SimplebarAngularModule,
  
    FullCalendarModule,
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    FlatpickrModule.forRoot(),
    CKEditorModule,
    PaginationModule,
    NgApexchartsModule,
    ProgressbarModule,
    DragDropModule,
    MatTableModule,
    SharedModule,
    DndModule,
    CountUpModule,
    PickerModule,
    DropzoneModule,
    AlertModule.forRoot()
    
  ],

})
export class DocumentModule { }
