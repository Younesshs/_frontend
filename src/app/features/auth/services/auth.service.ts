import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private jwt = null; // Simulation d'un token
	private expirationTimer: any;

	constructor(private Router: Router) {}

	login(credentials: any): Observable<{
		response: boolean;
		token?: string;
		expiration?: number;
		errorType?: string;
	}> {
		const { email, password } = credentials;

		if (email === 'name@locate-them.com' && password === 'manager') {
			return of({
				response: true,
				token: 'fake-jwt-token',
				expiration: 5000,
				// expiration: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
			});
		} else if (!email.includes('@')) {
			return of({ response: false, errorType: 'format' });
		} else {
			return of({ response: false, errorType: 'wrong' });
		}
	}

	setToken(token: string, expiration: number, stayLogin: boolean): void {
		const finalExpiration = stayLogin ? 24 * 60 * 60 * 1000 : expiration; // 24 hours or provided expiration

		const expirationTimestamp = Date.now() + finalExpiration;
		localStorage.setItem('token', token);
		localStorage.setItem('tokenExpiration', expirationTimestamp.toString());

		this.startTokenTimer(finalExpiration);
	}

	startTokenTimer(duration: number): void {
		if (this.expirationTimer) {
			clearTimeout(this.expirationTimer);
		}

		this.expirationTimer = setTimeout(() => {
			this.logout();
		}, duration);
	}

	logout(): void {
		localStorage.removeItem('token');
		localStorage.removeItem('tokenExpiration');
		clearTimeout(this.expirationTimer);
		this.expirationTimer = null;
		this.Router.navigate(['/auth']);
		console.info('disconnected...');
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
			this.logout();
			return false;
		}
	}
}
