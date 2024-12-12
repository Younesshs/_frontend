import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { ModalsService } from '../../../../core/services/modals.service';
import { NavigationService } from '../../services/navigation.service';

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
		private ModalsService: ModalsService,
		private AuthService: AuthService
	) {}

	toggleNavigation(section: string) {
		this.navigation[section].isOpen = !this.navigation[section].isOpen;
	}

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

	logout() {
		this.AuthService.logout();
	}
}
