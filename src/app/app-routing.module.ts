import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [
	{ path: '', redirectTo: '/vehicle-location', pathMatch: 'full' }, // Redirection par défaut
	{
		path: 'auth',
		loadChildren: () =>
			import('./features/auth/auth.module').then((m) => m.AuthModule),
	},
	{
		path: 'vehicle-location',
		loadChildren: () =>
			import('./features/vehicle-location/vehicle-location.module').then(
				(m) => m.VehicleLocationModule
			),
		canActivate: [LoginGuard],
	},
	{ path: '**', redirectTo: '/auth' }, // Route de secours
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
