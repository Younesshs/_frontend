import { Component } from '@angular/core';
import { LocationService } from './_services/location.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent {
	navigationIsOpen: boolean = true;

	constructor(private LocationService: LocationService) {}

	_getLeafletData() {
		const leafletData = this.LocationService._getLeafletData();
		console.log('Current Leaflet Data:', leafletData);
	}

	toggleNavigation() {
		this.navigationIsOpen = !this.navigationIsOpen;
	}
}
