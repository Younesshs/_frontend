import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../../../shared/models/vehicle';

@Injectable({
	providedIn: 'root',
})
export class VehicleService {
	private readonly apiUrl = `${environment.backendUrl}/vehicle`;

	private vehicles: Vehicle[] = [];

	constructor(private http: HttpClient) {}

	getAllVehicles(companyId: string): Observable<Vehicle[]> {
		return this.http.get<Vehicle[]>(
			`${this.apiUrl}?companyId=${companyId}`
		);
	}

	setVehicles(data: Vehicle[]): void {
		this.vehicles = data;
	}

	getVehicle(vehicleId: number): Observable<Vehicle> {
		return this.http.get<Vehicle>(`${this.apiUrl}/${vehicleId}`);
	}

	// TODO: Finir la fonctionnalité & backend
	addVehicle(
		newVehicle: Vehicle
	): Observable<{ message: string; result: boolean }> {
		console.log('Véhicule ajouté:', newVehicle);
		this.vehicles.push(newVehicle);
		return of({ message: 'véhicule ajouté', result: true });
		// return this.http.post(`${this.apiUrl}/`, newVehicle);
	}
}
