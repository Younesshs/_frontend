import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class LocationService {
	private readonly apiUrl = `${environment.backendUrl}/location`;

	constructor(private http: HttpClient) {}

	getLocations(gpsTrackerNumber: string): Observable<any> {
		return this.http.get<any>(`${this.apiUrl}/list/${gpsTrackerNumber}`);
	}
}
