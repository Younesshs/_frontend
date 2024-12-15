import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Vehicle } from 'src/app/shared/models/vehicle';
import { LoaderService } from '../../core/services/loader.service';
import { ModalsService } from '../../core/services/modals.service';
import { NavigationService } from './services/navigation.service';
import { VehicleService } from './services/vehicle.service';

@Component({
	selector: 'app-vehicle-location',
	standalone: false,
	templateUrl: './vehicle-location.component.html',
})
export class VehicleLocationComponent {
	// Chargement des données etc TODO: A la fin faire le systeme de loader
	readonly startLoading: number = 1000;
	vehicles: any[] = [];
	vehicleSelected!: any;
	show: boolean = false;

	constructor(
		private VehicleService: VehicleService,
		public NavigationService: NavigationService,
		public LoaderService: LoaderService,
		public ModalsService: ModalsService
	) {}

	// TODO: AJOUT LA CONFIG POUR REGLER L'AUTO GPS
	// TODO: VOIR COMMENT FAIRE POUR ACTIVER ET DESACTIVER DES VEHICLES DU GPS ET MODIFIER LES DONNEES ETC
	// TODO: QUAND CLICK SUR UN VEHICULE DANS LA CARTE, OUVRIR LA CARD DANS LA BARRE DE NAVIGATION (Avec gestion du slide)
	// TODO: FAIRE UN OUTPUT POUR AFFICHER LE VEHICULE SELECTIONNEE DANS LA BARRE DE NAVIGATION
	// TODO: LOADER

	ngOnInit(): void {
		initFlowbite();
		this.loadVehicles();
		setTimeout(() => {
			this.show = true;
		}, this.startLoading);
	}

	onValueChangeSelectedVehicle(newValue: Vehicle) {
		this.vehicleSelected = newValue;
		this.NavigationService.openVehicleDetails(newValue); // Ouvrir les détails dans la navigation
	}

	private loadVehicles(): void {
		this.VehicleService.getAllVehicles().subscribe({
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
