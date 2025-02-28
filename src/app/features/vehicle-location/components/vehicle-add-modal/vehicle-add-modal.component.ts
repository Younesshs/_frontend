import { Component, OnInit } from '@angular/core';
import { ModalsService } from '../../../../core/services/modals.service';
import { VehicleService } from '../../services/vehicle.service';

@Component({
	selector: 'app-vehicle-add-modal',
	standalone: false,
	templateUrl: './vehicle-add-modal.component.html',
})
export class VehicleAddModalComponent implements OnInit {
	currentStep = 1;

	addVehicleform: any = {
		navigation: {
			showDetails: false, // Default // Auto
		},
		options: {
			autoGpsTrackerEnabled: true, // Default // Auto
		},
		gpsTracker: {
			number: null, // Champs requis // User
			initialLocation: null, // Champs requis // Auto
			lastLocation: null, // Champs requis // Auto
		},
		vehicleInformations: {
			licensePlate: null, // Champs requis // User
			year: null, // User
			capacity: null, // User
			color: null, // User
			manufacturer: null, // User
			model: null, // User
		},
		assignedEmployee: {
			id: null, // User
			lastname: null, // User
			first: null, // User
		},
		vehicleStatus: {
			engineOn: false, // Auto
		},
		companyInformations: {
			id: null, // Champs requis // Auto
		},
	};
	addVehicleformError = {
		missing: false,
		format: {
			number: false,
			licensePlate: false,
			id: false,
			location: false,
		},
	};
	successMessage: string | null = null;

	employees: any[] = [];

	constructor(
		private ModalsService: ModalsService,
		private VehicleService: VehicleService
	) {}

	ngOnInit() {
		this.loadEmployees();
	}

	loadEmployees() {
		// TODO: SERVICES RECUPERER LES EMPLOYEEES PAR RAPPORT COMPANY
	}

	nextStep(step: number = null) {
		if (!step) {
			if (this.currentStep < 4) {
				this.currentStep++;
			}
		} else {
			this.currentStep = step;
		}
	}

	resetErrors() {
		this.addVehicleformError = {
			missing: false,
			format: {
				number: false,
				licensePlate: false,
				id: false,
				location: false,
			},
		};
		this.successMessage = null;
	}

	prevStep() {
		if (this.currentStep > 1) {
			this.currentStep--;
		}
	}

	validForm(): boolean {
		this.resetErrors();

		const gpsTracker = this.addVehicleform.gpsTracker;
		const vehicleInfo = this.addVehicleform.vehicleInformations;
		const companyInfo = this.addVehicleform.companyInformations;

		let isValid = true;

		// Étape 4 - Informations entreprise & Connexion au tracker
		if (!companyInfo.id) {
			this.addVehicleformError.format.id = true;
			this.currentStep = 4;
			isValid = false;
			console.log('here1');
		}
		if (!gpsTracker.initialLocation || !gpsTracker.lastLocation) {
			this.addVehicleformError.format.location = true;
			this.currentStep = 4;
			isValid = false;
			console.log('here2');
		}

		// Étape 3 - Employé assigné
		// empty

		// Étape 2 - Informations véhicule
		if (!vehicleInfo.licensePlate) {
			this.addVehicleformError.format.licensePlate = true;
			this.currentStep = 2;
			isValid = false;
			console.log('here3');
		}

		// Étape 1 - GPS Tracker
		if (!gpsTracker.number) {
			this.addVehicleformError.format.number = true;
			this.currentStep = 1;
			isValid = false;
			console.log('here4');
		}

		return isValid;
	}

	submitForm() {
		if (this.validForm()) {
			console.log('addVehicleform Data:', this.addVehicleform);
			this.successMessage = 'Le véhicule a été ajouté avec succès !';
		} else {
			console.log('addVehicleform Data:', 'erreur form');
		}
	}

	closeVehicleModal(): void {
		this.ModalsService.closeVehicleAddModal();
	}
}
