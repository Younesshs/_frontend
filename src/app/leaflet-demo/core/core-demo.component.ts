import { Component } from '@angular/core';
import { LocationService } from 'src/app/_services/location.service';

import { latLng, LatLng, tileLayer } from 'leaflet';

@Component({
	selector: 'leafletCoreDemo',
	templateUrl: './core-demo.component.html',
})
export class LeafletCoreDemoComponent {
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
}
