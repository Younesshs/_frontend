import { Injectable } from '@angular/core';
import { LatLng } from 'leaflet';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class MapCommunicationService {
	private focusMarkerSubject = new Subject<{
		center: LatLng;
		zoomLevel: number;
	}>();

	focusMarker$ = this.focusMarkerSubject.asObservable();

	focusOnMarker(center: LatLng, zoomLevel: number): void {
		this.focusMarkerSubject.next({ center, zoomLevel });
	}
}
