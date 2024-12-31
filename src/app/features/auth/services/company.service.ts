import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class CompanyService {
	private readonly apiUrl = `${environment.backendUrl}/company`;

	constructor(private http: HttpClient) {}

	addCompany(company: any): Observable<any> {
		return this.http.post<any>(`${this.apiUrl}/`, {
			company: company.name,
		});
	}
}
