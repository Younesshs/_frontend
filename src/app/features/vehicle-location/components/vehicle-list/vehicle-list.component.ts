import { Component, Input, OnInit } from '@angular/core';
import { latLng } from 'leaflet';
import { Vehicle } from '../../../../shared/models/vehicle';
import { MapCommunicationService } from '../../services/map-communication.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
	selector: 'app-vehicle-list',
	standalone: false,
	templateUrl: './vehicle-list.component.html',
})
export class VehicleListComponent implements OnInit {
	@Input() vehicles!: Vehicle[];
	private lastOpenedVehicle: Vehicle | null = null;

	constructor(
		private MapCommunicationService: MapCommunicationService,
		private NavigationService: NavigationService
	) {}

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

	ngOnInit(): void {
		this.NavigationService.selectedVehicle$.subscribe((selectedVehicle) => {
			if (selectedVehicle) {
				this.highlightSelectedVehicle(selectedVehicle);
			}
		});
	}

	highlightSelectedVehicle(selectedVehicle: Vehicle): void {
		if (this.lastOpenedVehicle) {
			this.lastOpenedVehicle.navigation.showDetails = false;
		}
		const vehicle = this.vehicles.find(
			(v) => v.gpsTracker.number === selectedVehicle.gpsTracker.number
		);
		if (vehicle) {
			vehicle.navigation.showDetails = true;
			this.lastOpenedVehicle = vehicle; // Stocker le dernier véhicule ouvert
		}
	}
}
