import { Component, Input } from '@angular/core';
import { NavigationService } from '../_services/navigation.service';

@Component({
	selector: 'app-navigation',
	standalone: false,
	templateUrl: './navigation.component.html',
})
export class NavigationComponent {
	@Input() vehicles!: any[];
	isVehicleModalOpen: boolean = false;

	constructor(private NavigationService: NavigationService) {}

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

	toggleDetails(vehicle: any) {
		vehicle.showDetails = !vehicle.showDetails;
	}

	toggleGps(vehicle: any) {
		vehicle.options.autoGpsEnabled = !vehicle.options.autoGpsEnabled;
	}

	toggleNavigationIsOpen() {
		this.NavigationService.toggleNavigationIsOpen();
	}

	openVehicleModal() {
		this.isVehicleModalOpen = true;
	}

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
		this.isVehicleModalOpen = false;
	}
}
