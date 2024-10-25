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

	leafletData!: LeafletData;

	constructor(private http: HttpClient) {}

	_updateLeafletData(
		url?: string,
		attribution?: string,
		zoom?: number,
		zoomLevels?: number[],
		lat?: number,
		lng?: number
	): void {
		const updatedData = {
			url: url ?? this.leafletData.url,
			attribution: attribution ?? this.leafletData.attribution,
			zoom: zoom ?? this.leafletData.zoom,
			zoomLevels: zoomLevels ?? this.leafletData.zoomLevels,
			lat: lat ?? this.leafletData.lat,
			lng: lng ?? this.leafletData.lng,
		};

		this.leafletData = { ...this.leafletData, ...updatedData };
	}

	_getLeafletData(): LeafletData {
		return this.leafletData;
	}

	getLocationsOfAllVehicles(): Observable<any> {
		return this.http.get(`${this.apiUrl}/location/vehicles`);
	}

	getVehicleByCarId(vehicleId: string): Observable<any> {
		return this.http.get(`${this.apiUrl}/location/${vehicleId}`);
	}
}
