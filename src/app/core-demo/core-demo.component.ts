import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/_services/vehicle.service';

import { Icon, latLng, LatLng, marker, tileLayer } from 'leaflet';
import { interval, Subscription } from 'rxjs';

@Component({
	selector: 'app-leaflet-core-demo',
	templateUrl: './core-demo.component.html',
})
export class LeafletCoreDemoComponent implements OnInit {
	vehicles: any;
	markers: any = [];
	updateSubscription: Subscription;
	autoUpdateEnabled: any;
	optionsSpec: any = {
		layers: [
			{
				url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
				attribution: 'Open Street Map',
			},
		],
		zoom: 12,
		center: [43.604145106074895, -358.5631958860042],
	};

	// Leaflet bindings
	zoom = this.optionsSpec.zoom;
	center = latLng(this.optionsSpec.center);
	options = {
		layers: [
			tileLayer(this.optionsSpec.layers[0].url, {
				attribution: this.optionsSpec.layers[0].attribution,
			}),
		],
		zoom: this.optionsSpec.zoom,
		center: latLng(this.optionsSpec.center),
	};

	// Form bindings
	zoomLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
	lat = this.center.lat;
	lng = this.center.lng;

	constructor(private VehicleService: VehicleService) {}

	ngOnInit(): void {
		this.loadVehicleLocations();
	}

	_updateLeafletData(
		url?: string,
		attribution?: string,
		zoom?: number,
		zoomLevels?: number[],
		lat?: number,
		lng?: number
	) {
		url = url ?? this.optionsSpec.layers[0].url;
		attribution = attribution ?? this.optionsSpec.layers[0].attribution;
		zoom = zoom ?? this.zoom;
		zoomLevels = zoomLevels ?? this.zoomLevels;
		lat = lat ?? this.lat;
		lng = lng ?? this.lng;
		this.VehicleService._updateLeafletData(
			url,
			attribution,
			zoom,
			zoomLevels,
			lat,
			lng
		);
	}

	onCenterChange(center: LatLng) {
		setTimeout(() => {
			this._updateLeafletData(
				null,
				null,
				this.zoom,
				null,
				center.lat,
				center.lng
			);
		});
	}

	onZoomChange(zoom: number) {
		setTimeout(() => {
			this._updateLeafletData(null, null, zoom, null, null, null);
		});
	}

	loadVehicleLocations(): void {
		this.VehicleService.getVehicles().subscribe((data: any[]) => {
			this.vehicles = data;
			this.addVehicleMarkers();
		});
	}

	addVehicleMarkers(): void {
		const customIcon = new Icon({
			iconUrl: '../../../assets/images/icon/car_icons/default.png',
			iconSize: [30, 30],
			iconAnchor: [15, 40],
			popupAnchor: [0, -40],
		});

		this.vehicles.forEach((vehicle: any) => {
			const vehicleMarker = marker(
				[
					vehicle.vehicle_status.current_location.latitude,
					vehicle.vehicle_status.current_location.longitude,
				],
				{ icon: customIcon }
			).bindPopup(this.getVehiclePopupContent(vehicle));

			this.markers.push(vehicleMarker);
		});
	}

	updateVehicleLocations(): void {
		this.VehicleService.getLocations().subscribe((data: any[]) => {
			data.forEach((newLocation) => {
				// Trouver le véhicule correspondant dans la liste this.vehicles
				const vehicle = this.vehicles.find(
					(v: { vehicle_id: any }) =>
						v.vehicle_id === newLocation.vehicle_id
				);

				if (vehicle) {
					vehicle.vehicle_status.current_location =
						newLocation.current_location;
				}
			});

			this.markers = [];
			this.addVehicleMarkers();
		});
	}

	startAutoUpdate(): void {
		if (!this.autoUpdateEnabled) {
			this.autoUpdateEnabled = true;
			this.updateSubscription = interval(5000).subscribe(() => {
				this.updateVehicleLocations();
			});
		}
	}

	stopAutoUpdate(): void {
		if (this.updateSubscription) {
			this.updateSubscription.unsubscribe();
			this.updateSubscription = null;
			this.autoUpdateEnabled = false; // Update the flag when stopped
		}
	}

	toggleAutoUpdate(): void {
		if (this.autoUpdateEnabled) {
			this.stopAutoUpdate();
		} else {
			this.startAutoUpdate();
		}
	}

	getVehiclePopupContent(vehicle: any): string {
		return `
      <div>
        <h3>${vehicle.vehicle_informations.manufacturer} ${vehicle.vehicle_informations.car_model}</h3>
        <p><strong>Plaque:</strong> ${vehicle.vehicle_informations.license_plate}</p>
        <p><strong>Conducteur:</strong> ${vehicle.assigned_employee.name}</p>
        <p><strong>Téléphone:</strong> ${vehicle.assigned_employee.phone_number}</p>
      </div>
    `;
	}
}
