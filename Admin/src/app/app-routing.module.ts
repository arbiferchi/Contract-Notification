import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { SuppliersModule } from './Suppliers/suppliers.module';
import { ContratModule } from './Contrat/Contrat.module';
import { NotificationModule } from './Notification/notification.module';
// Component
import { LayoutComponent } from './layouts/layout.component';

const routes: Routes = [
  { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),canActivate: [AuthGuard],
  },
   {path: 'auth', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
   { path: 'pages',loadChildren: () => import('./extraspages/extraspages.module').then(m => m.ExtraspagesModule)},
   { path: 'Supplier',loadChildren: () => import('./Suppliers/suppliers.module').then(m => m.SuppliersModule),canActivate: [AuthGuard]},
   { path: 'Contrat',loadChildren: () => import('./Contrat/Contrat.module').then(m => m.ContratModule),canActivate: [AuthGuard]},
   { path: 'notif',loadChildren: () => import('./Notification/notification.module').then(m => m.NotificationModule),canActivate: [AuthGuard]},
   { path: 'doc',loadChildren: () => import('./Documents/document.module').then(m => m.DocumentModule),canActivate: [AuthGuard]},
   { path: 'user',loadChildren: () => import('./User/user-module.module').then(m => m.UserModuleModule),canActivate: [AuthGuard]},



];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
