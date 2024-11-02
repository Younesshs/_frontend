import { Component, Input, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/_services/vehicle.service';

import { icon, latLng, LatLng, marker, Marker, tileLayer } from 'leaflet';
import { Vehicle } from '../_models/vehicle';

@Component({
	selector: 'app-leaflet-map',
	templateUrl: './leaflet-map.component.html',
})
export class LeafletMapComponent implements OnInit {
	@Input() vehicles: Vehicle[] = [];
	vehicleMarkers: Marker[] = [];

	mapOptions = {
		layers: [
			tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: 'Open Street Map',
			}),
		],
		zoom: 15,
		center: latLng([43.604145106074895, 1.444]),
	};

	zoomLevels: number[] = Array.from({ length: 14 }, (_, i) => i + 1);
	currentZoomLevel: number = this.mapOptions.zoom;
	currentCenter: LatLng = this.mapOptions.center;

	constructor(private vehicleService: VehicleService) {}

	ngOnInit(): void {
		this.initializeVehicleMarkers();
	}

	private initializeVehicleMarkers(): void {
		this.vehicleMarkers = this.vehicles.map((vehicle) =>
			this.createVehicleMarker(vehicle)
		);
	}

	private createVehicleMarker(vehicle: Vehicle): Marker {
		const { latitude, longitude } = vehicle.vehicleStatus.currentLocation;
		const color = vehicle.vehicleInformations.color.toLowerCase();
		const iconUrl = `../../assets/images/icon/car_icons/${color}.png`;

		return marker([latitude, longitude], {
			icon: icon({
				iconUrl: iconUrl,
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				className: 'custom-popup',
			}),
		}).bindPopup(`
				<p><strong>Véhicule:</strong> ${vehicle.vehicleInformations.licensePlate}</p>
				<p><strong>Chauffeur:</strong> ${vehicle.assignedEmployee.name}</p>
				<p><strong>Modèle:</strong> ${vehicle.vehicleInformations.manufacturer} ${
			vehicle.vehicleInformations.model
		}</p>
				<p><strong>Position:</strong> [${latitude.toFixed(6)}, ${longitude.toFixed(
			6
		)}]</p>
		`);
	}

	private updateMap(
		zoomLevel: number = this.currentZoomLevel,
		center: LatLng = this.currentCenter
	): void {
		this.vehicleService.updateMapData(zoomLevel, center);
	}

	onMapCenterChange(newCenter: LatLng): void {
		this.currentCenter = newCenter;
		this.updateMap();
	}

	onZoomLevelChange(newZoomLevel: number): void {
		this.currentZoomLevel = newZoomLevel;
		this.updateMap();
	}
}
