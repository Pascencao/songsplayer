import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';;
import { Routes } from '@angular/router';
import { LiveScreenComponent } from './live-screen/live-screen.component';
import { LoginComponent } from './login/login.component';
import { UserLoggedIn } from './services/auth.guard';


export const mainRoutes: Routes = [
    { path: '', component: AppComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [UserLoggedIn] },
    { path: 'live', component: LiveScreenComponent}
];

