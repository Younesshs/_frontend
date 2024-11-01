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

	constructor(
		private NavigationService: NavigationService,
		private ModalsService: ModalsService
	) {}

	toggleNavigationIsOpen() {
		this.NavigationService.toggleNavigationIsOpen();
	}

	openVehicleAddModal() {
		this.ModalsService.openVehicleAddModal();
	}
}
