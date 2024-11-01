import { DatePipe, NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { VehicleService } from '../_services/vehicle.service';

@Component({
	selector: 'app-vehicle-table',
	standalone: true,
	imports: [NgFor, NgClass, DatePipe],
	templateUrl: './vehicle-table.component.html',
})
export class VehicleTableComponent {
	vehicles: any[] = [];

	constructor(private VehicleService: VehicleService) {}

	ngOnInit(): void {
		this.VehicleService.getAllVehicles().subscribe({
			next: (data: any) => {
				this.vehicles = data;
			},
			error: (error: any) => {
				console.error('Error fetching vehicles:', error);
			},
		});
	}
}
