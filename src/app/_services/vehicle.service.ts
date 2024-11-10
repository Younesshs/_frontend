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

	// private vehicles: Vehicle[] = [];

	private vehicles: Vehicle[] = [
		{
			navigation: {
				showDetails: false,
			},
			options: {
				autoGpsEnabled: false,
			},
			gpsTracker: {
				initialLocation: {
					latitude: '43.472388',
					longitude: '1.301807',
				},
				lastLocation: {
					latitude: '43.61683968706096',
					longitude: '1.3959503173828125',
					timestamp: '2024-10-29T13:55:00.808Z',
				},
				number: 'teltonika-1',
			},
			vehicleInformations: {
				licensePlate: 'AB-001-CD',
				year: 2021,
				capacity: 5,
				color: 'blue',
				manufacturer: 'citroen',
				model: 'c3',
			},
			assignedEmployee: {
				id: 2,
				name: 'Paul MARTIN',
				role: 'chauffeur',
				phoneNumber: '+33611111111',
				email: 'paul.martin@locate-them.fr',
			},
			vehicleStatus: {
				engineOn: false,
			},
		},
	];

	constructor(private http: HttpClient) {}

	updateMapData(zoomLevel: number, center: LatLng): void {
		console.log('Zoom Level:', zoomLevel);
		console.log('Center:', center);
	}

	setVehicles(data: Vehicle[]): void {
		this.vehicles = data;
	}

	getAllVehicles(): Observable<Vehicle[]> {
		return of(this.vehicles);
		// return this.http.get<Vehicle[]>(`${this.apiUrl}/all`);
	}

	getVehicleById(vehicleId: number): Observable<Vehicle> {
		return this.http.get<Vehicle>(`${this.apiUrl}/${vehicleId}`);
	}

	getVehicleLocation(vehicleId: number): Observable<any> {
		return this.http.get(`${this.apiUrl}/${vehicleId}/location`);
	}

	getAllVehicleLocations(): Observable<any> {
		return this.http.get(`${this.apiUrl}/locations`);
	}

	addVehicle(
		newVehicle: any
	): Observable<{ message: string; result: boolean }> {
		console.log('Véhicule ajouté:', newVehicle);
		this.vehicles.push(newVehicle);
		return of({ message: 'véhicule ajouté', result: true });
		// return this.http.post(`${this.apiUrl}/add`, newVehicle);
	}
}
