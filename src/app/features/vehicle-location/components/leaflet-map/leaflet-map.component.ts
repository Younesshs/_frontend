import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import { LocationService } from '../../services/location.service';
import { MapCommunicationService } from '../../services/map-communication.service';
import { VehicleService } from '../../services/vehicle.service';

import { icon, latLng, LatLng, Map, marker, Marker, tileLayer } from 'leaflet';
import { interval, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { Vehicle } from '../../../../shared/models/vehicle';

@Component({
	selector: 'app-leaflet-map',
	templateUrl: './leaflet-map.component.html',
})
export class LeafletMapComponent implements OnInit, OnDestroy {
	private vehicleUpdateIntervalSubscription: Subscription | null = null;
	private destroy$ = new Subject<void>();
	private isClickAllowed = true;

	@Input() vehicles: any = [];
	@Output() selectedVehicle = new EventEmitter<any>();
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

	ngOnInit(): void {
		this.preloadIcons();
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

	private preloadIcons(): void {
		const colors = [
			'red',
			'blue',
			'green',
			'amber',
			'black',
			'brown',
			'cyan',
			'default',
			'emerald',
			'fuchshia',
			'grey',
			'indigo',
			'lime',
			'orange',
			'pink',
			'purple',
			'silver',
			'teal',
			'white',
			'yellow',
		]; // Ajoutez toutes les couleurs utilisées
		colors.forEach((color) => {
			const img = new Image();
			img.src = `../../assets/images/icon/car_icons/${color}.png`;
		});
	}

	updateLocalionVehicles(autoLocationTime: number) {
		this.autoGpsEnabledList = this.vehicles
			.filter((vehicle: Vehicle) => vehicle.options.autoGpsEnabled)
			.map((vehicle: Vehicle) => vehicle.gpsTracker.number)
			.join(',');

		// Mettre à jour avec l'intervalle
		this.autoGpsUpdate(autoLocationTime, this.autoGpsEnabledList);
	}

	autoGpsUpdate(autoLocationTime: number, gpsTrackerNumberList: string) {
		if (this.vehicleUpdateIntervalSubscription) {
			this.vehicleUpdateIntervalSubscription.unsubscribe();
		}

		this.vehicleUpdateIntervalSubscription = interval(autoLocationTime)
			.pipe(
				switchMap(() => this.getLocations(gpsTrackerNumberList)),
				takeUntil(this.destroy$) // Stopper l'abonnement si le composant est détruit
			)
			.subscribe({
				next: (newLocations) => this.updateVehicleMarkers(newLocations),
				error: (err) =>
					console.error('Error updating vehicle markers:', err),
			});
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
			<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
				<img src="assets/images/icon/car_icons/red.png" alt="image de voiture" class="w-10 h-10"/>
				<a href="#">
					<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
						Véhicule: ${vehicle.vehicleInformations.licensePlate}
					</h5>
				</a>
				<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">Chauffeur: ${
					vehicle.assignedEmployee.name
				}</p>
				<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">Modèle: ${
					vehicle.vehicleInformations.manufacturer
				} ${vehicle.vehicleInformations.model}</p>
				<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">Position: [${latitude.substring(
					0,
					7
				)}, ${longitude.substring(0, 7)}]</p>
			</div>
		`);

		// <a href="#" class="inline-flex font-medium items-center text-blue-600 hover:underline">
		// 			Voir la ligne directrice
		// 			<svg class="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
		// 				<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
		// 			</svg>
		// 		</a>

		// Clic sur le marqueur pour centrer et zoomer
		vehicleMarker.on('click', () => {
			if (!this.isNavigatedZoom) {
				// Assure que le clic direct fonctionne
				this.focusOnMap(vehicleMarker.getLatLng(), 18);
			}

			// Afficher le vehicule dans la barre de navigation
			this.selectedVehicle.emit(vehicle);
		});

		return vehicleMarker;
	}

	async updateVehicleMarkers(newLocations: any) {
		// Tableau temporaire pour stocker les nouveaux marqueurs mis à jour
		let updatedMarkers: Marker[] = [];

		if (!Array.isArray(newLocations)) {
			console.error('Expected an array, but received:', newLocations);
			return;
		}

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
		this.destroy$.next();
		this.destroy$.complete();
		if (this.vehicleUpdateIntervalSubscription) {
			this.vehicleUpdateIntervalSubscription.unsubscribe();
		}
	}
}
