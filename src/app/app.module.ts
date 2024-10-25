import {
	provideHttpClient,
	withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LocationService } from './_services/location.service';
import { PageLoaderComponent } from './_shared/page-loader/page-loader.component';
import { AppComponent } from './app.component';
import { LeafletDemoModule } from './leaflet-demo/leaflet-demo.module';
import { VehicleTableComponent } from './vehicle-table/vehicle-table.component';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		LeafletDemoModule,
		VehicleTableComponent,
		PageLoaderComponent,
	],
	providers: [LocationService, provideHttpClient(withInterceptorsFromDi())],
	bootstrap: [AppComponent],
})
export class AppModule {}
