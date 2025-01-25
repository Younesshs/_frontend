import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/features/auth/services/company.service';
import { LoaderService } from './../../../../core/services/loader.service';
import { UserService } from './../../../../core/services/user.service';
import { AuthService } from './../../services/auth.service';

interface formLogin {
	email: string;
	password: string;
	stayLogin: boolean;
}

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
	loginForm: formLogin = {
		email: '',
		password: '',
		stayLogin: false,
	};
	formError: any = {
		wrong: false,
		format: false,
		bot: false,
		user_not_found: false,
		company_not_found: false,
		company_not_confirmed: false,
	};
	tempCompanyName: string = null;

	constructor(
		public LoaderService: LoaderService,
		private AuthService: AuthService,
		private UserService: UserService,
		private CompanyService: CompanyService,
		private Router: Router
	) {}

	ngOnInit(): void {
		if (this.AuthService.isAuthenticated()) {
			this.Router.navigate(['/vehicle-location']);
		}
	}

	login() {
		this.formError = {
			wrong: false,
			format: false,
			bot: false,
			user_not_found: false,
			company_not_found: false,
			company_not_confirmed: false,
		};

		this.AuthService.login(this.loginForm).subscribe({
			next: (data: any) => {
				if (data.response) {
					if (data.company.companyIsConfirmed) {
						// Decode the token to get user information
						const tokenPayload = JSON.parse(
							atob(data.token.split('.')[1])
						);

						const userInformations = {
							userId: tokenPayload.userId,
							lastname: tokenPayload.lastname,
							firstname: tokenPayload.firstname,
							role: tokenPayload.role,
							createdAt: tokenPayload.createdAt,
							updatedAt: tokenPayload.updatedAt,
						};

						this.AuthService.setToken(
							data.token,
							data.tokenExpiration,
							this.loginForm.stayLogin,
							tokenPayload.iat,
							tokenPayload.exp
						);

						this.UserService.setUserInformations(
							userInformations.lastname,
							userInformations.firstname,
							userInformations.role
						);

						this.CompanyService.setCompanyInformations(
							data.company.companyName,
							data.company.companyId,
							data.company.createdAt,
							data.company.updatedAt
						);

						console.info('connected...');
						this.Router.navigate(['/vehicle-location']);
					} else {
						this.formError.company_not_confirmed = true;
						this.tempCompanyName = data.company.companyName;
					}
				}
			},
			error: (request) => {
				if (request.error.errorType === 'wrong') {
					this.formError.wrong = true;
				} else if (request.error.errorType === 'format') {
					this.formError.format = true;
				} else if (request.error.errorType === 'bot') {
					this.formError.bot = true;
				} else if (request.error.errorType === 'user_not_found') {
					this.formError.user_not_found = true;
				}
				console.error('Erreur lors de la connexion :', request);
			},
		});
	}
}
