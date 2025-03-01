import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/features/auth/services/company.service';
import { ModalsService } from '../../../../core/services/modals.service';
import { VehicleService } from '../../services/vehicle.service';
import { TrackerService } from './../../services/tracker.service';

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
			number: 869706060803154, // Champs requis // User
			initialLocation: null, // Champs requis // Auto
			lastLocation: null, // Champs requis // Auto
		},
		vehicleInformations: {
			licensePlate: 'an-256-cn', // Champs requis // User
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

	loader: any = {
		finally: {
			navigation: false,
			options: false,
			location: false,
			engineVehicle: false,
			company: false,
		},
	};

	constructor(
		private ModalsService: ModalsService,
		private CompanyService: CompanyService,
		private TrackerService: TrackerService,
		private VehicleService: VehicleService
	) {}

	ngOnInit() {
		this.loadEmployees();
	}

	loadEmployees() {
		// TODO: SERVICES RECUPERER LES EMPLOYEEES PAR RAPPORT COMPANY
	}

	getCompany() {
		const companyInformations =
			this.CompanyService.getCompanyInformations();
		this.addVehicleform.companyInformations.id =
			companyInformations.companyId;
		this.loader.finally.company = true;
	}

	getDataOfTracker(number: number) {
		this.TrackerService.getInitialLocation(number).subscribe({
			next: (data) => {
				console.log('data:', data);
				this.addVehicleform.gpsTracker.initialLocation =
					data.initialLocation;
				this.addVehicleform.gpsTracker.lastLocation =
					data.initialLocation;
				this.loader.finally.location = true;
				this.addVehicleform.vehicleStatus.engineOn = data.engineOn;
				this.loader.finally.engineVehicle = true;
			},
			error: (error) => {
				console.error('error:', error);
			},
		});
	}

	setDefaultData() {
		setTimeout(() => {
			this.addVehicleform.navigation.showDetails = false;
			this.loader.finally.navigation = true;
			setTimeout(() => {
				this.addVehicleform.options.autoGpsTrackerEnabled = true;
				this.loader.finally.options = true;
			}, 1500);
		}, 1000);
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

	prevStep() {
		if (this.currentStep > 1) {
			this.currentStep--;
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

	resetLoaders() {
		this.loader = {
			finally: {
				navigation: false,
				options: false,
				location: false,
				vehicle: false,
				company: false,
			},
		};
	}

	validForm(): boolean {
		this.resetErrors();
		this.nextStep(4);

		const gpsTracker = this.addVehicleform.gpsTracker;
		const vehicleInfo = this.addVehicleform.vehicleInformations;
		const companyInfo = this.addVehicleform.companyInformations;

		let isValid = true;

		// Étape 4 - Informations entreprise & Connexion au tracker
		if (!companyInfo.id) {
			this.addVehicleformError.format.id = true;
			this.currentStep = 4;
			isValid = false;
		} else {
			this.loader.finally.company = true;
		}

		if (!gpsTracker.initialLocation || !gpsTracker.lastLocation) {
			this.addVehicleformError.format.location = true;
			this.currentStep = 4;
			isValid = false;
		}

		// Étape 3 - Employé assigné
		// empty

		// Étape 2 - Informations véhicule
		if (!vehicleInfo.licensePlate) {
			this.addVehicleformError.format.licensePlate = true;
			this.currentStep = 2;
			isValid = false;
		}

		// Étape 1 - GPS Tracker
		if (!gpsTracker.number) {
			this.addVehicleformError.format.number = true;
			this.currentStep = 1;
			isValid = false;
		}

		return isValid;
	}

	submitForm() {
		this.resetLoaders();
		this.nextStep(4);
		this.setDefaultData();
		this.getCompany();
		this.getDataOfTracker(this.addVehicleform.gpsTracker.number);
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
