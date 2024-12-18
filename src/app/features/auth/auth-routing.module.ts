import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NewAccountComponent } from './components/new-account/new-account.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' }, // Par défaut, redirection vers login
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'new-account', component: NewAccountComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
