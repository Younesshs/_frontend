import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/_services/vehicle.service';
import { LocationService } from './../_services/location.service';
import { MapCommunicationService } from './../_services/map-communication.service';

import { icon, latLng, LatLng, Map, marker, Marker, tileLayer } from 'leaflet';
import { interval, Subscription, switchMap } from 'rxjs';
import { Vehicle } from '../_models/vehicle';

@Component({
	selector: 'app-leaflet-map',
	templateUrl: './leaflet-map.component.html',
})
export class LeafletMapComponent implements OnInit, OnDestroy {
	private vehicleUpdateSubscription: Subscription;
	@Input() vehicles: any = [];
	vehicleMarkers: Marker[] = [];
	private map!: Map;
	private isNavigatedZoom = false;
	autoGpsEnabledList: string;

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
		private VehicleService: VehicleService,
		private LocationService: LocationService,
		private MapCommunicationService: MapCommunicationService
	) {}

	private intervalId: any;

	ngOnInit(): void {
		this.initializeVehicleMarkers();
		this.MapCommunicationService.focusMarker$.subscribe(
			({ center, zoomLevel }) => {
				this.isNavigatedZoom = true; // Marqueur de zoom via navigation
				this.focusOnMap(center, zoomLevel);
			}
		);

		// Initialiser l'auto mise à jour des véhicules
		this.updateLocalionVehicles(10000);
	}

	updateLocalionVehicles(timeAutoReset: number) {
		this.autoGpsEnabledList = this.vehicles
			.filter((vehicle: Vehicle) => vehicle.options.autoGpsEnabled)
			.map((vehicle: Vehicle) => vehicle.gpsTracker.number)
			.join(',');

		// Mettre à jour avec l'intervalle
		this.autoGpsUpdate(timeAutoReset, this.autoGpsEnabledList);
	}

	autoGpsUpdate(timeAutoReload: number, gpsTrackerNumberList: string) {
		if (this.vehicleUpdateSubscription) {
			this.vehicleUpdateSubscription.unsubscribe();
		}

		// Lancer un abonnement pour récupérer et mettre à jour les positions
		this.vehicleUpdateSubscription = interval(timeAutoReload)
			.pipe(switchMap(() => this.getLocations(gpsTrackerNumberList)))
			.subscribe((newLocations) =>
				this.updateVehicleMarkers(newLocations)
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
		const { latitude, longitude } = vehicle.gpsTracker.lastLocation;
		const color = vehicle.vehicleInformations.color.toLowerCase();
		const iconUrl = `../../assets/images/icon/car_icons/${color}.png`;

		const vehicleMarker = marker([Number(latitude), Number(longitude)], {
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
      <p><strong>Position:</strong> [${latitude.substring(
			0,
			7
		)}, ${longitude.substring(0, 7)}]</p>
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

	async updateVehicleMarkers(newLocations: any) {
		console.log(newLocations);

		// Tableau temporaire pour stocker les nouveaux marqueurs mis à jour
		let updatedMarkers: Marker[] = [];

		newLocations.forEach((gpsTracker: any) => {
			let existingVehicleIndex = this.vehicles.findIndex(
				(vehicle: any) =>
					vehicle.gpsTracker.number === gpsTracker.number
			);

			let vehicleData = newLocations.find(
				(data: any) => data.number === gpsTracker.number
			);

			// Mets à jour les informations du véhicule avec les nouvelles données
			if (existingVehicleIndex !== -1 && vehicleData) {
				// Mettre à jour les informations du véhicule
				this.vehicles[existingVehicleIndex] = {
					...this.vehicles[existingVehicleIndex],
					gpsTracker: {
						...this.vehicles[existingVehicleIndex].gpsTracker,
						lastLocation: vehicleData.lastLocation,
						locationHistory: vehicleData.locationHistory,
					},
				};

				// Supprime le marqueur existant de la carte s'il est déjà affiché
				const existingMarker =
					this.vehicleMarkers[existingVehicleIndex];
				if (existingMarker) {
					this.map.removeLayer(existingMarker);
				}

				// Crée un nouveau marqueur pour le véhicule mis à jour
				const newMarker = this.createVehicleMarker(
					this.vehicles[existingVehicleIndex]
				);

				// Ajoute le marqueur à la carte
				newMarker.addTo(this.map);

				// Ajoute le nouveau marqueur au tableau temporaire des marqueurs mis à jour
				updatedMarkers.push(newMarker);
			}
		});

		// Remplace les marqueurs mis à jour dans `vehicleMarkers`
		newLocations.forEach((gpsTracker: any, index: number) => {
			const existingVehicleIndex = this.vehicles.findIndex(
				(vehicle: any) =>
					vehicle.gpsTracker.number === gpsTracker.number
			);
			if (existingVehicleIndex !== -1) {
				this.vehicleMarkers[existingVehicleIndex] =
					updatedMarkers[index];
			}
		});
	}

	getLocations(gpsTrackerNumberList: any): Promise<any> {
		return new Promise((resolve, reject) => {
			this.LocationService.getLocations(gpsTrackerNumberList).subscribe({
				next: (data: any) => {
					resolve(data); // Resolve the promise when data is available
				},
				error: (error) => {
					reject(error); // Reject the promise if an error occurs
				},
			});
		});
	}

	private updateMap(
		zoomLevel: number = this.currentZoomLevel,
		center: LatLng = this.currentCenter
	): void {
		this.VehicleService.updateMapData(zoomLevel, center);
	}

	onMapCenterChange(newCenter: LatLng): void {
		this.currentCenter = newCenter;
		this.updateMap();
	}

	onZoomLevelChange(newZoomLevel: number): void {
		this.currentZoomLevel = newZoomLevel;
		this.updateMap();
	}

	ngOnDestroy() {
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
		if (this.vehicleUpdateSubscription) {
			this.vehicleUpdateSubscription.unsubscribe();
		}
	}
}
