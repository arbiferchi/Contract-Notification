import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddNotifComponent } from './add-notif/add-notif.component';
import { TablenotifComponent } from './tablenotif/tablenotif.component';
import { EditnotifComponent } from './editnotif/editnotif.component';
const routes: Routes = [
  {
    path: 'Ajoutnotif/:id', component:  AddNotifComponent,
  },
  {
    path: 'ListNotif', component:  TablenotifComponent,
  },

  {
    path: 'editNotif/:id', component:  EditnotifComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
