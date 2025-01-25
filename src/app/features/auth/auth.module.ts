import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { ConfirmCompanyComponent } from './components/confirm-company/confirm-company.component';
import { FirstConnectionCompanyComponent } from './components/first-connection-company/first-connection-company.component';
import { LoginComponent } from './components/login/login.component';
import { NewCompanyComponent } from './components/new-company/new-company.component';

@NgModule({
	declarations: [
		LoginComponent,
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
