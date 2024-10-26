import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/_services/location.service';

import { Icon, latLng, LatLng, marker, tileLayer } from 'leaflet';

@Component({
	selector: 'leafletCoreDemo',
	templateUrl: './core-demo.component.html',
})
export class LeafletCoreDemoComponent implements OnInit {
	vehicles: any;
	markers: any = [];
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

	constructor(private LocationService: LocationService) {}

	ngOnInit(): void {
		// Charger les données des véhicules
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
		this.LocationService._updateLeafletData(
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
		this.LocationService.getLocationsOfAllVehicles().subscribe(
			(data: any[]) => {
				this.vehicles = data;
				this.addVehicleMarkers();
			}
		);
	}

	addVehicleMarkers(): void {
		const customIcon = new Icon({
			iconUrl: '../../../assets/images/icon/vehicle-default.png',
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
