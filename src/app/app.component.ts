import { Component, OnInit } from '@angular/core';
import { LoaderService } from './_services/loader.service';
import { ModalsService } from './_services/modals.service';
import { NavigationService } from './_services/navigation.service';
import { VehicleService } from './_services/vehicle.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	startLoading: number = 2000;
	autoGpsEnabled: boolean = false;

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
	show: boolean = false;

	get isPageLoader(): boolean {
		return this.LoaderService.isPageLoader;
	}

	get navigationIsOpen(): boolean {
		return this.NavigationService.navigationIsOpen;
	}

	get isVehicleAddModalOpen(): boolean {
		return this.ModalsService.isVehicleAddModalOpen;
	}

	constructor(
		private VehicleService: VehicleService,
		private NavigationService: NavigationService,
		private LoaderService: LoaderService,
		private ModalsService: ModalsService
	) {}

	ngOnInit() {
		this.LoaderService.loadingPageOn();
		this.getVehicles();
		setTimeout(() => {
			this.show = true;
			this.LoaderService.loadingPageOff();
		}, this.startLoading);
	}

	getVehicles() {
		this.VehicleService.getAllVehicles().subscribe({
			next: (data: any[]) => {
				this.vehicles = data;
			},
			error: (error) => {
				console.error(
					'Erreur lors de la récupération des véhicules :',
					error
				);
			},
		});
	}

	toggleNavigation() {
		this.NavigationService.toggleNavigationIsOpen();
	}
}
