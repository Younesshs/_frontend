import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyGuard } from 'src/app/core/guards/company.guard';
import { OwnerGuard } from 'src/app/core/guards/owner.guard';
import { ConfirmCompanyComponent } from './components/confirm-company/confirm-company.component';
import { FirstConnectionCompanyComponent } from './components/first-connection-company/first-connection-company.component';
import { LoginComponent } from './components/login/login.component';
import { NewCompanyComponent } from './components/new-company/new-company.component';

const routes: Routes = [
	{ path: '', redirectTo: 'login', pathMatch: 'full' }, // Par défaut, redirection vers login
	{ path: 'login', component: LoginComponent },
	{
		path: 'new-company',
		component: NewCompanyComponent,
		canActivate: [OwnerGuard],
	},
	{
		path: 'first-connection-company/:companyName',
		component: FirstConnectionCompanyComponent,
	},
	{
		path: 'confirm-company',
		component: ConfirmCompanyComponent,
		canActivate: [CompanyGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
