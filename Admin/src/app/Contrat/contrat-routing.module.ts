import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListContratComponent } from './list-contrat/list-contrat.component';
import { AddContratComponent } from './add-contrat/add-contrat.component';
import { ViewContratComponent } from './view-contrat/view-contrat.component';
import { EditContratComponent } from './edit-contrat/edit-contrat.component';
// Component


const routes: Routes = [
  {
    path: 'contratlist', component:  ListContratComponent,
  },
  {
    path: 'AjoutContrat', component:  AddContratComponent,
  },
  {
    path: 'View/:id', component:  ViewContratComponent,
  },
  {
    path: 'edit/:id', component:  EditContratComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratRoutingModule { }
