import { Component, OnInit } from '@angular/core';
import { VehicleService } from './_services/vehicle.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	navigationIsOpen: boolean = true;
	autoGpsEnabled: boolean = false;
	isVehicleModalOpen: boolean = false;

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

	vehicles: any[] = [];

	constructor(private VehicleService: VehicleService) {}

	ngOnInit() {
		this.getVehicles();
		// Input(service no component parent ou faire le changement récupérer uniquement leaflet core et pas le reste) des vehicles vers la map
		// Système de mise a jour des markers (en récupérer les vehicles ou gps tracker enabled)
		console.log(this.vehicles);
	}

	getVehicles() {
		this.VehicleService.getVehicles().subscribe(
			(data: any[]) => {
				this.vehicles = data;
			},
			(error) => {
				console.error(
					'Erreur lors de la récupération des véhicules :',
					error
				);
			}
		);
	}

	toggleDetails(vehicle: any) {
		vehicle.showDetails = !vehicle.showDetails;
	}

	toggleNavigation() {
		this.navigationIsOpen = !this.navigationIsOpen;
	}

	toggleGps(vehicle: any) {
		vehicle.options.autoGpsEnabled = !vehicle.options.autoGpsEnabled;
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

	addVehicle() {
		console.log('Véhicule ajouté:', this.newVehicle);
		this.vehicles.push(this.newVehicle);
		console.log(this.vehicles);
		this.closeVehicleModal();
	}
}
