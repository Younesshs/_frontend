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
	private readonly apiUrl = `${environment.backendUrl}/company`;
	private expirationTimer: any;

	constructor(private http: HttpClient, private Router: Router) {}

	addCompany(companyName: any): Observable<any> {
		return this.http.post<any>(`${this.apiUrl}/`, {
			companyName: companyName.companyName,
		});
	}

	regeneratePassword(companyName: any): Observable<any> {
		return this.http.post<any>(`${this.apiUrl}/regeneratePassword/`, {
			companyName: companyName.companyName,
		});
	}

	archiveCompany(companyName: any): Observable<any> {
		return this.http.post<any>(`${this.apiUrl}/archive/`, {
			companyName: companyName.companyName,
		});
	}

	restoreCompany(companyName: any): Observable<any> {
		return this.http.post<any>(`${this.apiUrl}/restore/`, {
			companyName: companyName.companyName,
		});
	}

	getConfirmCompanyForm(): Observable<any> {
		const companyId = this.getCompanyInformations().companyId;
		return this.http.get<any>(`${this.apiUrl}/confirm/form`, {
			params: { companyId: companyId },
		});
	}

	firstConnectionCompany(credentials: firstConnectionCompanyForm) {
		return this.http.post<any>(`${this.apiUrl}/firstConnection/`, {
			companyName: credentials.companyName,
			password: credentials.password,
		});
	}

	confirmCompany(confirmCompanyForm: any): Observable<any> {
		return this.http.post<any>(`${this.apiUrl}/confirm/`, {
			confirmCompanyForm: confirmCompanyForm,
		});
	}

	setCompanyToken(
		companyToken: string,
		expiration: number,
		companyId: string,
		companyName: string,
		createdAt: any,
		updatedAt: any
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
		localStorage.setItem('companyUpdatedAt', updatedAt);

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

			this.companyLogout(companyInformations.companyName);
		}, duration);
	}

	getCompanyToken() {
		return localStorage.getItem('companyToken');
	}

	getCompanyInformations() {
		return {
			companyId: localStorage.getItem('companyId'),
			companyName: localStorage.getItem('companyName'),
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

	companyLogout(companyName: string | null = null): void {
		clearTimeout(this.expirationTimer);
		this.expirationTimer = null;
		localStorage.removeItem('companyToken');
		localStorage.removeItem('companyTokenExpiration');
		localStorage.removeItem('companyId');
		localStorage.removeItem('companyName');
		localStorage.removeItem('companyCreatedAt');
		localStorage.removeItem('companyUpdatedAt');
		console.info('disconnected...');
		if (companyName) {
			this.Router.navigate([
				'/auth/first-connection-company/' + companyName,
			]);
		} else {
			this.Router.navigate(['/auth']);
		}
	}
}
