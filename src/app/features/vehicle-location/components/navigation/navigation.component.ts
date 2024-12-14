import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { ModalsService } from '../../../../core/services/modals.service';
import { NavigationService } from '../../services/navigation.service';
import { UserService } from './../../../../core/services/user.service';

@Component({
	selector: 'app-navigation',
	standalone: false,
	templateUrl: './navigation.component.html',
})
export class NavigationComponent implements OnInit {
	@Input() vehicles!: any[];
	user!: any;
	currentTime: string = '';
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
		private UserService: UserService,
		private AuthService: AuthService
	) {}

	ngOnInit(): void {
		this.updateTime();
		setInterval(() => {
			this.updateTime();
		}, 60000);
	}

	getUserName(): string {
		return this.UserService.getUserName() || 'Unknown'; // Récupère le rôle ou affiche "Unknown" si aucun
	}

	getUserRole(): string {
		return this.AuthService.getRole() || 'Unknown'; // Récupère le rôle ou affiche "Unknown" si aucun
	}

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

	updateTime(): void {
		const now = new Date();
		this.currentTime = now.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		});
	}

	logout() {
		this.AuthService.logout();
	}
}
