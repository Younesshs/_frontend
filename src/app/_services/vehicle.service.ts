import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LatLng } from 'leaflet';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../_models/vehicle';

@Injectable({
	providedIn: 'root',
})
export class VehicleService {
	private readonly apiUrl = `${environment.backendUrl}/vehicle`;

	private vehicles: Vehicle[] = [];

	constructor(private http: HttpClient) {}

	updateMapData(zoomLevel: number, center: LatLng): void {
		console.log('Zoom Level:', zoomLevel);
		console.log('Center:', center);
	}

	setVehicles(data: Vehicle[]): void {
		this.vehicles = data;
	}

	getVehicles(): Observable<Vehicle[]> {
		return this.http.get<Vehicle[]>(`${this.apiUrl}/`);
	}

	getVehicle(vehicleId: number): Observable<Vehicle> {
		return this.http.get<Vehicle>(`${this.apiUrl}/${vehicleId}`);
	}

	addVehicle(
		newVehicle: any
	): Observable<{ message: string; result: boolean }> {
		console.log('Véhicule ajouté:', newVehicle);
		this.vehicles.push(newVehicle);
		return of({ message: 'véhicule ajouté', result: true });
		// return this.http.post(`${this.apiUrl}/add`, newVehicle);
	}

	updateVehicle() {}

	deleteVehicle() {}
}
