import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ModalsService {
	isVehicleAddModalOpen: boolean = false;

	constructor() {}

	openVehicleAddModal() {
		this.isVehicleAddModalOpen = true;
	}

	closeVehicleAddModal() {
		this.isVehicleAddModalOpen = false;
	}
}
