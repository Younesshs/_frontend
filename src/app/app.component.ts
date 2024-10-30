import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent {
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

	vehicles = [
		{
			showDetails: false,
			options: {
				autoGpsEnabled: false,
			},
			gps_tracker_number: '600000001',
			vehicle_informations: {
				license_plate: 'AB-123-CD',
				year: 2012,
				capacity: 5,
				color: 'blue',
				manufacturer: 'citroen',
				car_model: 'c3',
			},
			assigned_employee: {
				employee_id: 2,
				name: 'Paul MARTIN',
				role: 'chauffeur',
				phone_number: '+33611111111',
				email: 'paul.martin@locate-them.fr',
			},
			vehicle_status: {
				engine_on: false,
				current_location: {
					latitude: 43.6045,
					longitude: 1.444,
					timestamp: '2024-10-29T13:55:00.808Z',
				},
			},
		},
		{
			showDetails: false,
			options: {
				autoGpsEnabled: false,
			},
			gps_tracker_number: '600000002',
			vehicle_informations: {
				license_plate: 'XY-456-ZT',
				year: 2016,
				capacity: 7,
				color: 'white',
				manufacturer: 'peugeot',
				car_model: '5008',
			},
			assigned_employee: {
				employee_id: 3,
				name: 'Sophie DURAND',
				role: 'chauffeur',
				phone_number: '+33622222222',
				email: 'sophie.durand@locate-them.fr',
			},
			vehicle_status: {
				engine_on: false,
				current_location: {
					latitude: 43.6037,
					longitude: 1.452,
					timestamp: '2024-10-29T13:55:00.808Z',
				},
			},
		},
		{
			showDetails: false,
			options: {
				autoGpsEnabled: false,
			},
			gps_tracker_number: '600000003',
			vehicle_informations: {
				license_plate: 'ZX-789-BY',
				year: 2020,
				capacity: 5,
				color: 'black',
				manufacturer: 'renault',
				car_model: 'clio',
			},
			assigned_employee: {
				employee_id: 4,
				name: 'Amélie BONNET',
				role: 'chauffeur',
				phone_number: '+33633333333',
				email: 'amelie.bonnet@locate-them.fr',
			},
			vehicle_status: {
				engine_on: false,
				current_location: {
					latitude: 43.6087,
					longitude: 1.443,
					timestamp: '2024-10-29T13:55:00.808Z',
				},
			},
		},
		{
			showDetails: false,
			options: {
				autoGpsEnabled: false,
			},
			gps_tracker_number: '600000004',
			vehicle_informations: {
				license_plate: 'MN-654-RD',
				year: 2018,
				capacity: 9,
				color: 'grey',
				manufacturer: 'mercedes',
				car_model: 'vito',
			},
			assigned_employee: {
				employee_id: 5,
				name: 'Julien LEROY',
				role: 'chauffeur',
				phone_number: '+33644444444',
				email: 'julien.leroy@locate-them.fr',
			},
			vehicle_status: {
				engine_on: false,
				current_location: {
					latitude: 43.607,
					longitude: 1.45,
					timestamp: '2024-10-29T13:55:00.808Z',
				},
			},
		},
		{
			showDetails: false,
			options: {
				autoGpsEnabled: false,
			},
			gps_tracker_number: '600000005',
			vehicle_informations: {
				license_plate: 'QR-852-JK',
				year: 2015,
				capacity: 4,
				color: 'green',
				manufacturer: 'ford',
				car_model: 'fiesta',
			},
			assigned_employee: {
				employee_id: 6,
				name: 'Emma MARTINEZ',
				role: 'chauffeur',
				phone_number: '+33655555555',
				email: 'emma.martinez@locate-them.fr',
			},
			vehicle_status: {
				engine_on: false,
				current_location: {
					latitude: 43.599,
					longitude: 1.437,
					timestamp: '2024-10-29T13:55:00.808Z',
				},
			},
		},
		{
			showDetails: false,
			options: {
				autoGpsEnabled: false,
			},
			gps_tracker_number: '600000006',
			vehicle_informations: {
				license_plate: 'LP-963-QW',
				year: 2014,
				capacity: 6,
				color: 'silver',
				manufacturer: 'opel',
				car_model: 'zafira',
			},
			assigned_employee: {
				employee_id: 7,
				name: 'Antoine LEBLANC',
				role: 'chauffeur',
				phone_number: '+33666666666',
				email: 'antoine.leblanc@locate-them.fr',
			},
			vehicle_status: {
				engine_on: false,
				current_location: {
					latitude: 43.612,
					longitude: 1.448,
					timestamp: '2024-10-29T13:55:00.808Z',
				},
			},
		},
		{
			showDetails: false,
			options: {
				autoGpsEnabled: false,
			},
			gps_tracker_number: '600000007',
			vehicle_informations: {
				license_plate: 'TS-741-GF',
				year: 2021,
				capacity: 5,
				color: 'yellow',
				manufacturer: 'toyota',
				car_model: 'yaris',
			},
			assigned_employee: {
				employee_id: 8,
				name: 'Nina DUBOIS',
				role: 'chauffeur',
				phone_number: '+33677777777',
				email: 'nina.dubois@locate-them.fr',
			},
			vehicle_status: {
				engine_on: false,
				current_location: {
					latitude: 43.605,
					longitude: 1.441,
					timestamp: '2024-10-29T13:55:00.808Z',
				},
			},
		},
		{
			showDetails: false,
			options: {
				autoGpsEnabled: false,
			},
			gps_tracker_number: '600000008',
			vehicle_informations: {
				license_plate: 'GH-258-RL',
				year: 2019,
				capacity: 5,
				color: 'black',
				manufacturer: 'audi',
				car_model: 'a3',
			},
			assigned_employee: {
				employee_id: 9,
				name: 'Leo RICHARD',
				role: 'chauffeur',
				phone_number: '+33688888888',
				email: 'leo.richard@locate-them.fr',
			},
			vehicle_status: {
				engine_on: false,
				current_location: {
					latitude: 43.609,
					longitude: 1.453,
					timestamp: '2024-10-29T13:55:00.808Z',
				},
			},
		},
		{
			showDetails: false,
			options: {
				autoGpsEnabled: false,
			},
			gps_tracker_number: '600000009',
			vehicle_informations: {
				license_plate: 'BL-369-VC',
				year: 2017,
				capacity: 8,
				color: 'blue',
				manufacturer: 'volkswagen',
				car_model: 'transporter',
			},
			assigned_employee: {
				employee_id: 10,
				name: 'Clara MOREAU',
				role: 'chauffeur',
				phone_number: '+33699999999',
				email: 'clara.moreau@locate-them.fr',
			},
			vehicle_status: {
				engine_on: false,
				current_location: {
					latitude: 43.61,
					longitude: 1.447,
					timestamp: '2024-10-29T13:55:00.808Z',
				},
			},
		},
		{
			showDetails: false,
			options: {
				autoGpsEnabled: false,
			},
			gps_tracker_number: '600000010',
			vehicle_informations: {
				license_plate: 'ZR-147-WD',
				year: 2023,
				capacity: 5,
				color: 'orange',
				manufacturer: 'fiat',
				car_model: '500',
			},
			assigned_employee: {
				employee_id: 11,
				name: 'Lucas DUMONT',
				role: 'chauffeur',
				phone_number: '+33700000000',
				email: 'lucas.dumont@locate-them.fr',
			},
			vehicle_status: {
				engine_on: false,
				current_location: {
					latitude: 43.611,
					longitude: 1.439,
					timestamp: '2024-10-29T13:55:00.808Z',
				},
			},
		},
	];

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
