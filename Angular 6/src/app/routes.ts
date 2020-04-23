import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { BookTicketComponent} from './book-ticket/book-ticket.component'
import { EventListComponent} from './event-list/event-list.component' 
import { from } from 'rxjs';
export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'bookTicket', component: BookTicketComponent
    },
    {
        path: 'eventList', component: EventListComponent,
    },
    {
        path: 'bookTicket/:id', component: BookTicketComponent
    },
    {
        path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]
    },
    {
        path: '', redirectTo: '/eventList', pathMatch: 'full'
    },
    {
        path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard]
    },
    
    {
        path: 'fileupload', component: FileuploadComponent
    }
];