import { Component } from '@angular/core';
import { FlowbiteService } from '../services/flowbite.service';

@Component({
	selector: 'app-flowbite',
	standalone: false,
	templateUrl: './flowbite.component.html',
	styleUrl: './flowbite.component.scss',
})
export class FlowbiteComponent {
	constructor(private FlowbiteService: FlowbiteService) {}

	ngOnInit(): void {
		this.FlowbiteService.loadFlowbite((flowbite) => {
			// Your custom code here
			console.log('Flowbite loaded', flowbite);
		});
	}
}
