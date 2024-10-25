import { Component } from '@angular/core';
import { LocationService } from 'src/app/_services/location.service';

import { latLng, LatLng, tileLayer } from 'leaflet';
import { LeafletData } from 'src/app/_models/leaflet-data';

@Component({
	selector: 'leafletCoreDemo',
	templateUrl: './core-demo.component.html',
})
export class LeafletCoreDemoComponent {
	leafletData!: LeafletData;

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

	_initData() {
		let data: any = this.LocationService.getLeafletData();
	}

	onCenterChange(center: LatLng) {
		setTimeout(() => {
			this.lat = center.lat;
			this.lng = center.lng;
			this._initData();
		});
	}

	onZoomChange(zoom: number) {
		setTimeout(() => {
			this._initData();
		});
	}

	doApply() {
		this.center = latLng(this.lat, this.lng);
		this._initData();
	}
}
