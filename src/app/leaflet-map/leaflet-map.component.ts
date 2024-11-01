import { Component, Input, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/_services/vehicle.service';

import { icon, latLng, LatLng, marker, Marker, tileLayer } from 'leaflet';

@Component({
	selector: 'app-leaflet-map',
	templateUrl: './leaflet-map.component.html',
})
export class LeafletMapComponent implements OnInit {
	@Input() vehicles!: any[];
	vehicleMarkers: Marker[] = [];
	autoUpdateEnabled: boolean = false;

	mapOptions = {
		layers: [
			tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: 'Open Street Map',
			}),
		],
		zoom: 12,
		center: latLng([43.604145106074895, 1.444]),
	};

	zoomLevels = Array.from({ length: 14 }, (_, i) => i + 1);
	currentZoomLevel = this.mapOptions.zoom;
	currentCenter = this.mapOptions.center;

	constructor(private VehicleService: VehicleService) {}

	ngOnInit() {
		setTimeout(() => {
			this.placeVehicleMarkers();
		}, 1000);
	}

	private placeVehicleMarkers(): void {
		this.vehicleMarkers = this.vehicles.map((vehicle) => {
			const { latitude, longitude } =
				vehicle.vehicle_status.current_location;
			const color = vehicle.vehicle_informations.color.toLowerCase();

			const iconUrl = `../../assets/images/icon/car_icons/${color}.png`;

			return marker([latitude, longitude], {
				icon: icon({
					iconUrl: iconUrl,
					iconSize: [25, 41],
					iconAnchor: [12, 41],
					popupAnchor: [1, -34],
				}),
			}).bindPopup(`
				<p><strong>Véhicule:</strong> ${vehicle.vehicle_informations.license_plate}</p>
				<p><strong>Chauffeur:</strong> ${vehicle.assigned_employee.name}</p>
				<p><strong>Modèle:</strong> ${vehicle.vehicle_informations.manufacturer} ${
				vehicle.vehicle_informations.car_model
			}</p>
				<p><strong>Position:</strong> [${latitude.toFixed(6)}, ${longitude.toFixed(
				6
			)}]</p>
			`);
		});
	}

	private updateMap(zoomLevel?: number, center?: LatLng): void {
		this.VehicleService.updateMapData(
			zoomLevel ?? this.currentZoomLevel,
			center ?? this.currentCenter
		);
	}

	onMapCenterChange(newCenter: LatLng): void {
		this.updateMap(this.currentZoomLevel, newCenter);
	}

	onZoomLevelChange(newZoomLevel: number): void {
		this.updateMap(newZoomLevel);
	}
}
