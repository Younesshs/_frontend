import {
	provideHttpClient,
	withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LeafletModule } from 'projects/ngx-leaflet/src/public-api';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleService } from './_services/vehicle.service';
import { PageLoaderComponent } from './_shared/page-loader/page-loader.component';
import { AppComponent } from './app.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { VehicleTableComponent } from './vehicle-table/vehicle-table.component';

@NgModule({
	declarations: [AppComponent, LeafletMapComponent],
	imports: [
		LeafletModule,
		BrowserModule,
		VehicleTableComponent,
		PageLoaderComponent,
		FormsModule,
		ReactiveFormsModule,
	],
	providers: [VehicleService, provideHttpClient(withInterceptorsFromDi())],
	bootstrap: [AppComponent],
})
export class AppModule {}
