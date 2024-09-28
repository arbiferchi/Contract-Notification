import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { EmailComponent } from './email/email.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { WidgetsComponent } from './widgets/widgets.component';
import { ToDoComponent } from './to-do/to-do.component';
import { ContactsComponent } from './contacts/contacts.component';
import { KanbanboardComponent } from './kanbanboard/kanbanboard.component';

const routes: Routes = [
  {
    path: "calendar",
    component: CalendarComponent
  },
  {
    path: "chat",
    component: ChatComponent
  },
  {
    path: "email",
    component: EmailComponent
  },
  {
    path: "file-manager",
    component: FileManagerComponent
  },
  {
    path: "to-do",
    component: ToDoComponent
  },
  {
    path: "contacts",
    component: ContactsComponent
  },
  {
    path: "kanbanboard",
    component: KanbanboardComponent
  },
  {
    path: "widgets",
    component: WidgetsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
