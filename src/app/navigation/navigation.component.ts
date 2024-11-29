import { Component, Input } from '@angular/core';
import { NavigationService } from '../_services/navigation.service';
import { ModalsService } from './../_services/modals.service';

@Component({
	selector: 'app-navigation',
	standalone: false,
	templateUrl: './navigation.component.html',
})
export class NavigationComponent {
	@Input() vehicles!: any[];
	navigation: any = {
		vehicles: {
			isOpen: false,
		},
		alerts: {
			isOpen: false,
		},
		configurations: {
			isOpen: false,
		},
	};

	constructor(
		private NavigationService: NavigationService,
		private ModalsService: ModalsService
	) {}

	toggleNavigation(section: string) {
		this.navigation[section].isOpen = !this.navigation[section].isOpen;
	}

	// TODO: AJOUT LA CONFIG POUR REGLER L'AUTO GPS
	// TODO: VOIR COMMENT FAIRE POUR ACTIVER ET DESACTIVER DES VEHICLES DU GPS ET MODIFIER LES DONNEES ETC
	// TODO: QUAND CLICK SUR UN VEHICULE DANS LA CARTE, OUVRIR LA CARD DANS LA BARRE DE NAVIGATION (Avec gestion du slide)

	closeNavigation() {
		this.navigation.forEach((element: { isOpen: boolean }) => {
			element.isOpen = false;
		});
	}

	closeNavigationBar(): void {
		this.NavigationService.closeNavigation();
	}

	openVehicleAddModal(): void {
		this.ModalsService.openVehicleAddModal();
	}
}
