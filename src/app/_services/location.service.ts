import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LeafletData } from '../_models/leaflet-data';

@Injectable({
	providedIn: 'root',
})
export class LocationService {
	private apiUrl = environment.backendUrl;

	leafletData!: any;

	constructor(private http: HttpClient) {}

	getLeafletData(): LeafletData {
		let data: LeafletData = {
			layers: [
				{
					url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
					attribution: 'Open Street Map',
				},
			],
			zoom: 12,
			zoomLevels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
			lat: 43.604145106074895,
			lng: -358.5631958860042,
		};
		this.leafletData = data;
		return data;
	}

	getLocationsOfAllVehicles(): Observable<any> {
		return this.http.get(`${this.apiUrl}/location/vehicles`);
	}

	getVehicleByCarId(vehicleId: string): Observable<any> {
		return this.http.get(`${this.apiUrl}/location/${vehicleId}`);
	}
}
