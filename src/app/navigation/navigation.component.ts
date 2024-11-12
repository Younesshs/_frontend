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

	openNavigation(section: string) {
		this.navigation[section].isOpen = true;
	}

	// TODO: FINIR OUVERTURE FERMETURE NAV BAR ET AJOUT LA CONFIG POUR REGLER L'AUTO GPS
	// TODO: VOIR COMMENT FAIRE POUR ACTIVER ET DESACTIVER DES VEHICLES DU GPS ET MODIFIER LES DONNEES ETC

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
