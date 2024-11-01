import { Component } from '@angular/core';
import { ModalsService } from './../_services/modals.service';
import { VehicleService } from './../_services/vehicle.service';

@Component({
	selector: 'app-vehicle-add-modal',
	standalone: false,
	templateUrl: './vehicle-add-modal.component.html',
})
export class VehicleAddModalComponent {
	// FAKE DATA
	newVehicle = {
		showDetails: true,
		options: {
			autoGpsEnabled: false,
		},
		gps_tracker_number: '600000011',
		vehicle_informations: {
			license_plate: 'OO-000-OO',
			year: 2022,
			capacity: 4,
			color: 'red',
			manufacturer: 'ford',
			car_model: 'focus',
		},
		assigned_employee: {
			employee_id: 1,
			name: 'test',
			role: 'chauffeur',
			phone_number: '+33600000054',
			email: 'test.test@locate-them.fr',
		},
		vehicle_status: {
			engine_on: false,
			current_location: {
				latitude: 43.6045,
				longitude: 1.444,
				timestamp: '2024-10-29T13:55:00.808Z',
			},
		},
	};

	constructor(
		private ModalsService: ModalsService,
		private VehicleService: VehicleService
	) {}

	closeVehicleModal() {
		this.newVehicle = {
			showDetails: true,
			options: {
				autoGpsEnabled: false,
			},
			gps_tracker_number: '',
			vehicle_informations: {
				license_plate: '',
				year: null,
				capacity: null,
				color: '',
				manufacturer: '',
				car_model: '',
			},
			assigned_employee: {
				employee_id: null,
				name: '',
				role: '',
				phone_number: '',
				email: '',
			},
			vehicle_status: {
				engine_on: false,
				current_location: {
					latitude: null,
					longitude: null,
					timestamp: '',
				},
			},
		};
		this.ModalsService.closeVehicleAddModal();
	}

	addVehicle() {
		this.VehicleService.addVehicle(this.newVehicle).subscribe({
			next: (data: any) => {
				if (data.result) {
					this.closeVehicleModal();
				}
			},
			error: (error) => {
				console.error("Erreur lors de l'ajout du véhicule :", error);
			},
		});
	}
}
