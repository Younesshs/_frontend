import { Component } from '@angular/core';
import { VehicleService } from './_services/vehicle.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent {
	navigationIsOpen: boolean = true;

	constructor(private VehicleService: VehicleService) {}

	_getLeafletData() {
		const leafletData = this.VehicleService._getLeafletData();
		console.log('Current Leaflet Data:', leafletData);
	}

	toggleNavigation() {
		this.navigationIsOpen = !this.navigationIsOpen;
	}
}
