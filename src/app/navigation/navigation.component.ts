import { Component, Input } from '@angular/core';
import { NavigationService } from '../_services/navigation.service';

@Component({
	selector: 'app-navigation',
	standalone: false,
	templateUrl: './navigation.component.html',
})
export class NavigationComponent {
	@Input() vehicles!: any[];

	constructor(private NavigationService: NavigationService) {}

	toggleNavigationIsOpen() {
		this.NavigationService.toggleNavigationIsOpen();
	}
}
