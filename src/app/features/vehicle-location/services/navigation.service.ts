import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { Vehicle } from 'src/app/shared/models/vehicle';

@Injectable({
	providedIn: 'root',
})
export class NavigationService {
	private navigationOpen: boolean = true;
	private _selectedVehicle = new BehaviorSubject<Vehicle | null>(null);
	selectedVehicle$ = this._selectedVehicle
		.asObservable()
		.pipe(
			distinctUntilChanged(
				(prev, curr) =>
					prev?.gpsTracker.number === curr?.gpsTracker.number
			)
		);
	get selectedVehicle(): Vehicle | null {
		return this._selectedVehicle.value;
	}

	get isNavigationOpen(): boolean {
		return this.navigationOpen;
	}

	openNavigation(): void {
		this.navigationOpen = true;
	}

	closeNavigation(): void {
		this.navigationOpen = false;
	}

	openVehicleDetails(vehicle: Vehicle): void {
		if (
			this.selectedVehicle?.gpsTracker.number !==
			vehicle.gpsTracker.number
		) {
			this._selectedVehicle.next(vehicle);
		}
	}

	isVehicleSelected(vehicle: Vehicle): boolean {
		return (
			this.selectedVehicle?.gpsTracker?.number ===
			vehicle.gpsTracker.number
		); // Identifier le véhicule sélectionné
	}
}
