import { DatePipe, NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { LocationService } from '../_services/location.service';

@Component({
	selector: 'app-vehicle-table',
	standalone: true,
	imports: [NgFor, NgClass, DatePipe],
	templateUrl: './vehicle-table.component.html',
	styleUrl: './vehicle-table.component.scss',
})
export class VehicleTableComponent {
	vehicles: any[] = [];

	constructor(private locationService: LocationService) {}

	ngOnInit(): void {
		this.locationService.getLocationsOfAllVehicles().subscribe({
			next: (data: any) => {
				this.vehicles = data;
			},
			error: (error: any) => {
				console.error('Error fetching vehicles:', error);
			},
		});
	}
}
