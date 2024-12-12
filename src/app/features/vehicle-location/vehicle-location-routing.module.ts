import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeafletMapComponent } from './components/leaflet-map/leaflet-map.component';
import { VehicleAddModalComponent } from './components/vehicle-add-modal/vehicle-add-modal.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleLocationComponent } from './vehicle-location.component';

const routes: Routes = [
	{
		path: '',
		component: VehicleLocationComponent,
		children: [
			{ path: 'list', component: VehicleListComponent },
			{ path: 'add', component: VehicleAddModalComponent },
			{ path: 'map', component: LeafletMapComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class VehicleLocationRoutingModule {}
