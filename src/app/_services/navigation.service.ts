import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class NavigationService {
	navigationIsOpen: boolean = true;

	constructor() {}

	toggleNavigationIsOpen() {
		this.navigationIsOpen = !this.navigationIsOpen;
	}
}
