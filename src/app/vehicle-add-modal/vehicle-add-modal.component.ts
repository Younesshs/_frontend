import { Component } from '@angular/core';
import { Vehicle } from '../_models/vehicle';
import { ModalsService } from './../_services/modals.service';
import { VehicleService } from './../_services/vehicle.service';

@Component({
	selector: 'app-vehicle-add-modal',
	standalone: false,
	templateUrl: './vehicle-add-modal.component.html',
})
export class VehicleAddModalComponent {
	// FAKE DATA COMPLETED
	newVehicle: Vehicle = {
		navigation: { showDetails: true },
		options: {
			autoGpsEnabled: false,
		},
		gpsTracker: {
			initialLocation: { latitude: '1111', longitude: '44444' },
			lastLocation: {
				latitude: '1111',
				longitude: '44444',
				timestamp: '4444',
			},
			number: 'teltonika-20',
		},
		vehicleInformations: {
			licensePlate: 'OO-000-OO',
			year: 2022,
			capacity: 4,
			color: 'red',
			manufacturer: 'ford',
			model: 'focus',
		},
		assignedEmployee: {
			id: 1,
			name: 'test',
			role: 'chauffeur',
			phoneNumber: '+33600000054',
			email: 'test.test@locate-them.fr',
		},
		vehicleStatus: {
			engineOn: false,
		},
	};

	constructor(
		private ModalsService: ModalsService,
		private VehicleService: VehicleService
	) {}

	resetForm(): void {
		this.newVehicle = {
			navigation: {
				showDetails: true,
			},
			options: {
				autoGpsEnabled: false,
			},
			gpsTracker: {
				initialLocation: {
					latitude: '',
					longitude: '',
				},
				lastLocation: {
					latitude: '',
					longitude: '',
					timestamp: '',
				},
				number: '',
			},
			vehicleInformations: {
				licensePlate: '',
				year: null,
				capacity: null,
				color: '',
				manufacturer: '',
				model: '',
			},
			assignedEmployee: {
				id: null,
				name: '',
				role: '',
				phoneNumber: '',
				email: '',
			},
			vehicleStatus: {
				engineOn: false,
			},
		};
	}

	closeVehicleModal(): void {
		this.resetForm();
		this.ModalsService.closeVehicleAddModal();
	}

	addVehicle(): void {
		this.VehicleService.addVehicle(this.newVehicle).subscribe({
			next: (data: any) => {
				if (data.result) {
					this.closeVehicleModal();
				} else {
					console.error("Erreur lors de l'ajout du véhicule #1");
					this.resetForm();
				}
			},
			error: (error) => {
				console.error("Erreur lors de l'ajout du véhicule #2 :", error);
			},
		});
	}
}
