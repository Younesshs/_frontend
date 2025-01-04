import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerGuard } from 'src/app/core/guards/owner.guard';
import { FirstConnectionCompanyComponent } from './components/first-connection-company/first-connection-company.component';
import { LoginComponent } from './components/login/login.component';
import { NewCompanyComponent } from './components/new-company/new-company.component';

const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' }, // Par défaut, redirection vers login
	{ path: 'login', component: LoginComponent },
	// { path: 'register', component: RegisterComponent },
	{
		path: 'new-company',
		component: NewCompanyComponent,
		canActivate: [OwnerGuard],
	},
	{
		path: 'first-connection-company/:companyName',
		component: FirstConnectionCompanyComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
