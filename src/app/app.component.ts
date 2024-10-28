import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent {
	navigationIsOpen: boolean = true;
	expanded: boolean = false;

	vehicles = [
		{
			license_plate: 'AN-256-CN',
			year: 2023,
			capacity: 4,
			color: 'black',
			manufacturer: 'Peugeot',
			car_model: '207',
			engine_on: true,
			current_location: { latitude: 43.6166, longitude: -358.604 },
			timestamp: '2024-10-27T02:43:02.808Z',
			assigned_employee: {
				employee_id: '1',
				name: 'Youness HADDOU',
				role: 'Driver',
				phone_number: '+33 6 00 00 00 00',
			},
			showDetails: false,
		},
		{
			license_plate: 'VW-057-OL',
			year: 2023,
			capacity: 4,
			color: 'blue',
			manufacturer: 'Toyota',
			car_model: 'Yaris',
			engine_on: false,
			current_location: { latitude: 43.6166, longitude: -358.604 },
			timestamp: '2024-25-14T02:43:02.808Z',
			assigned_employee: {
				employee_id: '1',
				name: 'Anissa REZALU',
				role: 'Driver',
				phone_number: '+33 6 00 00 00 01',
			},
			showDetails: false,
		},
		// Ajoute d'autres véhicules si nécessaire
	];

	toggleDetails(vehicle: any) {
		vehicle.showDetails = !vehicle.showDetails;
	}

	toggleNavigation() {
		this.navigationIsOpen = !this.navigationIsOpen;
	}
}
