import { Component } from '@angular/core';

@Component({
	selector: 'leaflet-demo',
	templateUrl: './leaflet-demo.component.html',
})
export class LeafletDemoComponent {
	show = false;

	ngOnInit() {
		// Primarily for debugging
		setTimeout(() => {
			this.show = true;
		}, 1000);
	}
}
