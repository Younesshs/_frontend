import { Component } from '@angular/core';
import { LocationService } from './_services/location.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent {
	constructor(private LocationService: LocationService) {}

	_getLeafletData() {
		const leafletData = this.LocationService._getLeafletData();
		console.log('Current Leaflet Data:', leafletData);
	}
}
