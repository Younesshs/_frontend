import { Component } from '@angular/core';
import { LocationService } from './_services/location.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent {
	constructor(private LocationService: LocationService) {}

	callGetCurrentPositionAndZoom() {
		const leafletData = this.LocationService.getLeafletData();
		console.log('Current Leaflet Data:', leafletData);
	}
}
