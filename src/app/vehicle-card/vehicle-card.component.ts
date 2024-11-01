import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-vehicle-card',
	standalone: false,
	templateUrl: './vehicle-card.component.html',
})
export class VehicleCardComponent {
	@Input() vehicle!: any;

	toggleGps(vehicle: any) {
		vehicle.options.autoGpsEnabled = !vehicle.options.autoGpsEnabled;
	}
}
