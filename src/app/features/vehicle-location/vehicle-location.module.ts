import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from 'projects/ngx-leaflet/src/public-api';
import { LeafletMapComponent } from './components/leaflet-map/leaflet-map.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { VehicleAddModalComponent } from './components/vehicle-add-modal/vehicle-add-modal.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleLocationRoutingModule } from './vehicle-location-routing.module';

import {
	provideHttpClient,
	withInterceptors,
	withInterceptorsFromDi,
} from '@angular/common/http';
import { authInterceptor } from 'src/app/core/interceptors/auth.interceptor';
import { VehicleCardComponent } from './components/vehicle-card/vehicle-card.component';
import { VehicleService } from './services/vehicle.service';
import { VehicleLocationComponent } from './vehicle-location.component';

@NgModule({
	declarations: [
		VehicleLocationComponent,
		LeafletMapComponent,
		NavigationComponent,
		VehicleListComponent,
		VehicleCardComponent,
		VehicleAddModalComponent,
	],
	imports: [
		CommonModule,
		VehicleLocationRoutingModule,
		LeafletModule,
		FormsModule,
		ReactiveFormsModule,
	],
	// providers: [VehicleService, provideHttpClient(withInterceptorsFromDi())],
	providers: [
		VehicleService,
		provideHttpClient(
			withInterceptors([authInterceptor]),
			withInterceptorsFromDi()
		),
	],
	bootstrap: [VehicleLocationComponent],
})
export class VehicleLocationModule {}
