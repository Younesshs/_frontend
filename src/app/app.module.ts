import {
	provideHttpClient,
	withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleService } from './_services/vehicle.service';
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
		FormsModule,
		ReactiveFormsModule,
	],
	providers: [VehicleService, provideHttpClient(withInterceptorsFromDi())],
	bootstrap: [AppComponent],
})
export class AppModule {}
