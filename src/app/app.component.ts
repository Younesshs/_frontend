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
	readonly startLoading: number = 2000;
	vehicles: any[] = [];
	show: boolean = false;

	constructor(
		private VehicleService: VehicleService,
		public NavigationService: NavigationService,
		public LoaderService: LoaderService,
		public ModalsService: ModalsService
	) {}

	ngOnInit(): void {
		this.LoaderService.enablePageLoading();
		this.loadVehicles();
		setTimeout(() => {
			this.show = true;
			this.LoaderService.disablePageLoading();
		}, this.startLoading);
	}

	private loadVehicles(): void {
		this.VehicleService.getVehicles().subscribe({
			next: (data: any[]) => {
				this.vehicles = data;
				this.VehicleService.setVehicles(data);
			},
			error: (error) => {
				console.error(
					'Erreur lors de la récupération des véhicules :',
					error
				);
			},
		});
	}

	toggleNavigation(): void {
		this.NavigationService.openNavigation();
	}
}
