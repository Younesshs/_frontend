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

	confirmCompany(company: any): Observable<any> {
		return this.http.post<any>(`${this.apiUrl}/confirm/`, {
			name: company.name,
			email: company.email,
			phone: company.phone,
			address: company.address,
			siret: company.siret,
			logo: company.logo,
			numberOfEmployees: company.numberOfEmployees,
		});
	}

	setCompanyToken(
		companyToken: string,
		expiration: number,
		companyId: string,
		companyName: string,
		createdAt: any
	): void {
		const expirationTimestamp = Date.now() + expiration;

		localStorage.setItem('companyToken', companyToken);
		localStorage.setItem(
			'companyTokenExpiration',
			expirationTimestamp.toString()
		);
		localStorage.setItem('companyId', companyId);
		localStorage.setItem('companyName', companyName);
		localStorage.setItem('companyCreatedAt', createdAt);

		this.startCompanyTokenTimer(expiration);
	}

	startCompanyTokenTimer(duration: number): void {
		let companyInformations;
		if (this.expirationTimer) {
			clearTimeout(this.expirationTimer);
		}

		this.expirationTimer = setTimeout(() => {
			// Récupérer les informations de l'entreprise ('name')
			companyInformations = this.getCompanyInformations();

			this.companyLogout(companyInformations.name);
		}, duration);
	}

	getCompanyToken() {
		return localStorage.getItem('companyToken');
	}

	getCompanyInformations() {
		return {
			companyId: localStorage.getItem('companyId'),
			name: localStorage.getItem('companyName'),
			createdAt: localStorage.getItem('companyCreatedAt'),
		};
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

	companyLogout(name: string | null = null): void {
		clearTimeout(this.expirationTimer);
		this.expirationTimer = null;
		localStorage.removeItem('companyToken');
		localStorage.removeItem('companyTokenExpiration');
		localStorage.removeItem('companyId');
		localStorage.removeItem('companyName');
		localStorage.removeItem('companyCreatedAt');
		console.info('disconnected...');
		if (name) {
			this.Router.navigate(['/auth/first-connection-company/' + name]);
		} else {
			this.Router.navigate(['/auth']);
		}
	}
}
