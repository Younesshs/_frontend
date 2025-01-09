import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { FirstConnectionCompanyComponent } from './components/first-connection-company/first-connection-company.component';
import { LoginComponent } from './components/login/login.component';
import { NewCompanyComponent } from './components/new-company/new-company.component';
import { RegisterComponent } from './components/register/register.component';
import { ConfirmCompanyComponent } from './components/confirm-company/confirm-company.component';

@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent,
		NewCompanyComponent,
		FirstConnectionCompanyComponent,
		ConfirmCompanyComponent,
	],
	imports: [
		CommonModule,
		AuthRoutingModule,
		FormsModule,
		ReactiveFormsModule,
	],
})
export class AuthModule {}
