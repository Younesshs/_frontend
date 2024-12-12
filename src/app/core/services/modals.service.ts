import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ModalsService {
	private vehicleAddModalOpen: boolean = false;

	get isVehicleAddModalOpen(): boolean {
		return this.vehicleAddModalOpen;
	}

	openVehicleAddModal(): void {
		this.vehicleAddModalOpen = true;
	}

	closeVehicleAddModal(): void {
		this.vehicleAddModalOpen = false;
	}
}
