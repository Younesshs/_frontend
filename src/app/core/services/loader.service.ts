import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LoaderService {
	private pageLoaderActive: boolean = false;

	get isPageLoading(): boolean {
		return this.pageLoaderActive;
	}

	enablePageLoading(): void {
		this.pageLoaderActive = true;
	}

	disablePageLoading(): void {
		this.pageLoaderActive = false;
	}
}
