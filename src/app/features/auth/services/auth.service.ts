import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './../../../core/services/user.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly apiUrl = `${environment.backendUrl}/user`;
	private expirationTimer: any;

	constructor(
		private http: HttpClient,
		private Router: Router,
		private UserService: UserService
	) {}

	login(credentials: any): Observable<any> {
		return this.http.post<any>(`${this.apiUrl}/login`, {
			email: credentials.email,
			password: credentials.password,
			stayLogin: credentials.stayLogin,
		});
	}

	setToken(
		token: string,
		expiration: number,
		stayLogin: boolean,
		iat: number,
		exp: number
	): void {
		const finalExpiration = stayLogin ? 24 * 60 * 60 * 1000 : expiration; // 24 heures ou expiration fournie
		const expirationTimestamp = Date.now() + finalExpiration;

		localStorage.setItem('token', token);
		localStorage.setItem('tokenExpiration', expirationTimestamp.toString());
		localStorage.setItem('iat', iat.toString());
		localStorage.setItem('exp', exp.toString());

		this.startTokenTimer(finalExpiration);
	}

	startTokenTimer(duration: number): void {
		if (this.expirationTimer) {
			clearTimeout(this.expirationTimer);
		}

		console.log(duration);

		this.expirationTimer = setTimeout(() => {
			this.logout();
		}, duration);
	}

	logout(): void {
		clearTimeout(this.expirationTimer);
		this.expirationTimer = null;
		localStorage.removeItem('token');
		localStorage.removeItem('tokenExpiration');
		localStorage.removeItem('iat');
		localStorage.removeItem('exp');
		this.UserService.deleteUserInformations();
		console.info('disconnected...');
		this.Router.navigate(['/auth']);
	}

	getToken() {
		return localStorage.getItem('token');
	}

	getExpiration() {
		return localStorage.getItem('tokenExpiration');
	}

	isAuthenticated(): boolean {
		const token = this.getToken();
		const expiration = Number(this.getExpiration());

		if (token && expiration > Date.now()) {
			return true;
		} else {
			if (token !== null && expiration === 0) {
				this.logout();
			} else {
				this.Router.navigate(['/auth']);
			}
			return false;
		}
	}
}
