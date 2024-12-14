import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from './../../../core/services/user.service';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private jwt = null; // Simulation d'un token
	private expirationTimer: any;

	constructor(private Router: Router, private UserService: UserService) {}

	login(credentials: any): Observable<{
		response: boolean;
		token?: string;
		expiration?: number;
		role?: string;
		errorType?: string;
	}> {
		const { email, password } = credentials;

		if (email === 'admin@locate-them.com' && password === 'admin') {
			return of({
				response: true,
				token: 'fake-jwt-token-admin',
				expiration: 2 * 60 * 60 * 1000, // 2 heures
				role: 'admin',
				username: 'HADDOU Youness',
			});
		} else if (email === 'user@locate-them.com' && password === 'user') {
			return of({
				response: true,
				token: 'fake-jwt-token-user',
				expiration: 2 * 60 * 60 * 1000, // 2 heures
				role: 'agent',
				username: 'PORTET Julien',
			});
		} else if (!email.includes('@')) {
			return of({ response: false, errorType: 'format' });
		} else {
			return of({ response: false, errorType: 'wrong' });
		}
	}

	setToken(
		token: string,
		expiration: number,
		stayLogin: boolean,
		role: string
	): void {
		const finalExpiration = stayLogin ? 24 * 60 * 60 * 1000 : expiration; // 24 heures ou expiration fournie
		const expirationTimestamp = Date.now() + finalExpiration;

		localStorage.setItem('token', token);
		localStorage.setItem('tokenExpiration', expirationTimestamp.toString());
		localStorage.setItem('userRole', role);

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
		clearTimeout(this.expirationTimer);
		this.expirationTimer = null;
		localStorage.removeItem('token');
		localStorage.removeItem('tokenExpiration');
		localStorage.removeItem('userRole');
		this.UserService.deleteUsername();
		console.info('disconnected...');
		this.Router.navigate(['/auth']);
	}

	getToken() {
		return localStorage.getItem('token');
	}

	getExpiration() {
		return localStorage.getItem('tokenExpiration');
	}

	getRole(): string | null {
		return localStorage.getItem('userRole');
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

	hasRole(requiredRole: string): boolean {
		const userRole = this.getRole();
		return userRole === requiredRole;
	}
}
