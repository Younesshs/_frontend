import { Component, Input } from '@angular/core';
import { latLng } from 'leaflet';
import { Vehicle } from '../_models/vehicle';
import { MapCommunicationService } from '../_services/map-communication.service';

@Component({
	selector: 'app-vehicle-list',
	standalone: false,
	templateUrl: './vehicle-list.component.html',
})
export class VehicleListComponent {
	@Input() vehicles!: Vehicle[];

	constructor(private MapCommunicationService: MapCommunicationService) {}

	toggleDetails(vehicle: Vehicle): void {
		vehicle.showDetails = !vehicle.showDetails;
		if (vehicle.showDetails) {
			this.focusOnVehicle(vehicle.vehicleStatus.currentLocation);
		}
	}

	focusOnVehicle(location: any): void {
		this.MapCommunicationService.focusOnMarker(
			latLng(location.latitude, location.longitude),
			16
		);
	}
}
