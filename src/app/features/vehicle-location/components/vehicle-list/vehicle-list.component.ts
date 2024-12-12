import { Component, Input } from '@angular/core';
import { latLng } from 'leaflet';
import { Vehicle } from '../../../../shared/models/vehicle';
import { MapCommunicationService } from '../../services/map-communication.service';

@Component({
	selector: 'app-vehicle-list',
	standalone: false,
	templateUrl: './vehicle-list.component.html',
})
export class VehicleListComponent {
	@Input() vehicles!: Vehicle[];

	constructor(private MapCommunicationService: MapCommunicationService) {}

	toggleDetails(vehicle: Vehicle): void {
		vehicle.navigation.showDetails = !vehicle.navigation.showDetails;
		if (vehicle.navigation.showDetails) {
			this.focusOnVehicle(vehicle.gpsTracker.lastLocation);
		}
	}

	focusOnVehicle(location: any): void {
		this.MapCommunicationService.focusOnMarker(
			latLng(location.latitude, location.longitude),
			16
		);
	}
}
