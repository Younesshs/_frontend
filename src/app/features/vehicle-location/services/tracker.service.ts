import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class TrackerService {
	private readonly apiUrl = `${environment.backendUrl}/trackers`;

	constructor(private http: HttpClient) {}

	getInitialLocation(number: number): Observable<any> {
		return this.http.get<any>(
			`${this.apiUrl}/initialLocation?number=${number}`
		);
	}
}
