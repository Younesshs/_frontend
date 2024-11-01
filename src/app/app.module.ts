import {
	provideHttpClient,
	withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { VehicleListComponent } from './vehicle-list/vehicle-list.component';

import { LeafletModule } from 'projects/ngx-leaflet/src/public-api';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleService } from './_services/vehicle.service';
import { PageLoaderComponent } from './_shared/page-loader/page-loader.component';
import { AppComponent } from './app.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
	declarations: [
		AppComponent,
		LeafletMapComponent,
		NavigationComponent,
		VehicleListComponent,
	],
	imports: [
		LeafletModule,
		BrowserModule,
		PageLoaderComponent,
		FormsModule,
		ReactiveFormsModule,
	],
	providers: [VehicleService, provideHttpClient(withInterceptorsFromDi())],
	bootstrap: [AppComponent],
})
export class AppModule {}
