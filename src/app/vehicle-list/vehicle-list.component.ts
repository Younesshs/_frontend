import { Component, Input } from '@angular/core';
import { Vehicle } from '../_models/vehicle';

@Component({
	selector: 'app-vehicle-list',
	standalone: false,
	templateUrl: './vehicle-list.component.html',
})
export class VehicleListComponent {
	@Input() vehicles!: Vehicle[];

	toggleDetails(vehicle: Vehicle): void {
		vehicle.showDetails = !vehicle.showDetails;
	}
}
