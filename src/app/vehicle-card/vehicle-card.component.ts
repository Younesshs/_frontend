import { Component, Input } from '@angular/core';
import { Vehicle } from '../_models/vehicle';

@Component({
	selector: 'app-vehicle-card',
	standalone: false,
	templateUrl: './vehicle-card.component.html',
})
export class VehicleCardComponent {
	@Input() vehicle!: Vehicle;

	toggleGps(): void {
		this.vehicle.options.autoGpsEnabled =
			!this.vehicle.options.autoGpsEnabled;
	}
}
