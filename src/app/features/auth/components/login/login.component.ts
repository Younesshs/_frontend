import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from './../../../../core/services/loader.service';
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
		email: 'name@locate-them.com',
		password: 'manager',
		stayLogin: false,
	};
	formError: any = {
		wrong: false,
		format: false,
		bot: false,
	};

	constructor(
		public LoaderService: LoaderService,
		private AuthService: AuthService,
		private Router: Router
	) {}

	ngOnInit(): void {}

	login() {
		this.formError = { wrong: false, format: false, bot: false };

		this.AuthService.login(this.loginForm).subscribe({
			next: (data: any) => {
				if (data.response) {
					this.AuthService.setToken(
						data.token,
						data.expiration,
						this.loginForm.stayLogin
					);

					this.Router.navigate(['/vehicle-location']);
				} else {
					// Gérer les différentes erreurs
					if (data.errorType === 'wrong') {
						this.formError.wrong = true;
					} else if (data.errorType === 'format') {
						this.formError.format = true;
					} else if (data.errorType === 'bot') {
						this.formError.bot = true;
					}
				}
			},
			error: (error) => {
				console.error('Erreur lors de la connexion :', error);
			},
		});
	}
}
