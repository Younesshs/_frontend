import { Component, Input, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/_services/vehicle.service';
import { MapCommunicationService } from './../_services/map-communication.service';

import { icon, latLng, LatLng, Map, marker, Marker, tileLayer } from 'leaflet';
import { Vehicle } from '../_models/vehicle';

@Component({
	selector: 'app-leaflet-map',
	templateUrl: './leaflet-map.component.html',
})
export class LeafletMapComponent implements OnInit {
	@Input() vehicles: Vehicle[] = [];
	vehicleMarkers: Marker[] = [];
	private map!: Map;
	private isNavigatedZoom = false;

	mapOptions = {
		layers: [
			tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: 'Open Street Map',
			}),
		],
		zoom: 12,
		center: latLng([43.604145106074895, 1.444]),
	};

	zoomLevels: number[] = Array.from({ length: 14 }, (_, i) => i + 1);
	currentZoomLevel: number = this.mapOptions.zoom;
	currentCenter: LatLng = this.mapOptions.center;

	constructor(
		private vehicleService: VehicleService,
		private MapCommunicationService: MapCommunicationService
	) {}

	ngOnInit(): void {
		this.initializeVehicleMarkers();
		this.MapCommunicationService.focusMarker$.subscribe(
			({ center, zoomLevel }) => {
				this.isNavigatedZoom = true; // Marqueur de zoom via navigation
				this.focusOnMap(center, zoomLevel);
			}
		);
	}

	onMapReady(map: Map) {
		this.map = map;
	}

	private focusOnMap(center: LatLng, zoomLevel: number): void {
		if (this.map) {
			this.map.setView(center, zoomLevel, {
				animate: true,
				duration: 2,
				easeLinearity: 0.1,
			});
		}
		this.isNavigatedZoom = false; // Reset le flag après recentrage
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

		const vehicleMarker = marker([latitude, longitude], {
			icon: icon({
				iconUrl: iconUrl,
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				className: 'custom-popup',
			}),
		}).bindPopup(`
      <p><strong>Véhicule:</strong> ${
			vehicle.vehicleInformations.licensePlate
		}</p>
      <p><strong>Chauffeur:</strong> ${vehicle.assignedEmployee.name}</p>
      <p><strong>Modèle:</strong> ${vehicle.vehicleInformations.manufacturer} ${
			vehicle.vehicleInformations.model
		}</p>
      <p><strong>Position:</strong> [${latitude.toFixed(
			6
		)}, ${longitude.toFixed(6)}]</p>
    `);

		// Clic sur le marqueur pour centrer et zoomer
		vehicleMarker.on('click', () => {
			if (!this.isNavigatedZoom) {
				// Assure que le clic direct fonctionne
				this.focusOnMap(vehicleMarker.getLatLng(), 18);
			}
		});

		return vehicleMarker;
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
