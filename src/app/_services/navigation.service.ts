import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class NavigationService {
	private navigationOpen: boolean = true;

	get isNavigationOpen(): boolean {
		return this.navigationOpen;
	}

	openNavigation(): void {
		this.navigationOpen = true;
	}

	closeNavigation(): void {
		this.navigationOpen = false;
	}
}
