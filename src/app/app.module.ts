import {
	provideHttpClient,
	withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehicleService } from './features/vehicle-location/services/vehicle.service';
import { FlowbiteComponent } from './flowbite/components/flowbite.component';
import { PageLoaderComponent } from './shared/components/page-loader/page-loader.component';

@NgModule({
	declarations: [AppComponent, FlowbiteComponent],
	imports: [
		PageLoaderComponent,
		BrowserModule,
		AppRoutingModule,
		// LeafletModule,
		// FormsModule,
		// ReactiveFormsModule,
	],
	providers: [VehicleService, provideHttpClient(withInterceptorsFromDi())],
	bootstrap: [AppComponent],
})
export class AppModule {}
