import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { firstConnectionCompanyForm } from './../../../shared/models/firstConnectionCompanyForm';

@Injectable({
	providedIn: 'root',
})
export class CompanyService {
	// you services-1736005046
	private readonly apiUrl = `${environment.backendUrl}/company`;
	private expirationTimer: any;

	constructor(private http: HttpClient, private Router: Router) {}

	addCompany(company: any): Observable<any> {
		return this.http.post<any>(`${this.apiUrl}/`, {
			company: company.name,
		});
	}

	firstConnectionCompany(credentials: firstConnectionCompanyForm) {
		return this.http.post<any>(`${this.apiUrl}/firstConnection/`, {
			name: credentials.name,
			password: credentials.password,
		});
	}

	setCompanyToken(companyToken: string, expiration: number): void {
		const expirationTimestamp = Date.now() + expiration;

		localStorage.setItem('companyToken', companyToken);
		localStorage.setItem(
			'companyTokenExpiration',
			expirationTimestamp.toString()
		);

		this.startCompanyTokenTimer(expirationTimestamp);
	}

	setCompanyInformations(name: string, createdAt: any): void {
		localStorage.setItem('companyName', name);
		localStorage.setItem('companyCreatedAt', createdAt);
	}

	startCompanyTokenTimer(duration: number): void {
		if (this.expirationTimer) {
			clearTimeout(this.expirationTimer);
		}

		this.expirationTimer = setTimeout(() => {
			this.companyLogout();
		}, duration);
	}

	getCompanyToken() {
		return localStorage.getItem('companyToken');
	}

	getCompanyExpiration() {
		return localStorage.getItem('companyTokenExpiration');
	}

	companyIsAuthenticated(): boolean {
		const token = this.getCompanyToken();
		const expiration = Number(this.getCompanyExpiration());

		if (token && expiration > Date.now()) {
			return true;
		} else {
			if (token !== null && expiration === 0) {
				this.companyLogout();
			} else {
				this.Router.navigate(['/auth']);
			}
			return false;
		}
	}

	companyLogout(): void {
		clearTimeout(this.expirationTimer);
		this.expirationTimer = null;
		localStorage.removeItem('companyToken');
		localStorage.removeItem('companyTokenExpiration');
		localStorage.removeItem('companyName');
		localStorage.removeItem('companyCreatedAt');
		console.info('disconnected...');
		this.Router.navigate(['/auth']);
	}
}
