import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { LoaderService } from './core/services/loader.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	constructor(public LoaderService: LoaderService) {}

	ngOnInit(): void {
		initFlowbite();
	}
}
