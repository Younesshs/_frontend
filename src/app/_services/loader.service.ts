import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LoaderService {
	isPageLoader: boolean = false;

	loadingPageOn() {
		this.isPageLoader = true;
	}

	loadingPageOff() {
		this.isPageLoader = false;
	}
}
