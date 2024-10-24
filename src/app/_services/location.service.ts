import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class LocationService {
	private apiUrl = environment.backendUrl;

	constructor(private http: HttpClient) {}

	getLocationsOfAllVehicles(): Observable<any> {
		return this.http.get(`${this.apiUrl}/location/vehicles`);
	}

	getVehicleByCarId(vehicleId: string): Observable<any> {
		return this.http.get(`${this.apiUrl}/location/${vehicleId}`);
	}
}
