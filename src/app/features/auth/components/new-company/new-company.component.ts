import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';

interface newCompanyForm {
	companyName: string;
}

@Component({
	selector: 'app-new-company',
	standalone: false,
	templateUrl: './new-company.component.html',
})
export class NewCompanyComponent {
	newCompanyForm: newCompanyForm = { companyName: 'test' };
	newCompanyFormError = {
		exist_company: false,
		missing: false,
		exist_user: false,
		not_found: false,
	};
	successMessage: string | null = null;
	tempPassword: string | null = null;
	generatedLink: string | null = null;

	constructor(private CompanyService: CompanyService) {}

	addCompany() {
		//TODO: Si bug vérifier les données recu et les conditions
		this.resetMessage();
		this.CompanyService.addCompany(this.newCompanyForm).subscribe({
			next: (data: any) => {
				this.successMessage = null; // Réinitialise le message de succès

				if (
					data.message ===
					'Entreprise et utilisateur créés avec succès'
				) {
					this.successMessage = data.message;
					this.tempPassword = data.company.password;
					this.generatedLink = `http://localhost:4200/auth/first-connection-company/${this.newCompanyForm.companyName}`;
				}
			},
			error: (request) => {
				if (request.error.errorType === 'exist_company') {
					this.newCompanyFormError.exist_company = true;
				} else if (request.error.errorType === 'missing') {
					this.newCompanyFormError.missing = true;
				} else if (request.error.exist_user === 'exist_user') {
					this.newCompanyFormError.exist_user = true;
				}
				console.error('Erreur lors de la connexion :', request);
			},
		});
	}

	regeneratePassword() {
		this.resetMessage();
		this.CompanyService.regeneratePassword(this.newCompanyForm).subscribe({
			next: (data: any) => {
				this.successMessage = data.message;
				this.tempPassword = data.password;
				this.generatedLink = `http://localhost:4200/auth/first-connection-company/${this.newCompanyForm.companyName}`;
			},
			error: (request) => {
				if (request.error.errorType === 'not_found') {
					this.newCompanyFormError.not_found = true;
				} else if (request.error.errorType === 'missing') {
					this.newCompanyFormError.missing = true;
				}
				console.error('Erreur lors de la connexion :', request);
			},
		});
	}

	archiveCompany() {
		this.resetMessage();
		this.CompanyService.archiveCompany(this.newCompanyForm).subscribe({
			next: (data: any) => {
				this.successMessage = data.message;
			},
			error: (request) => {
				if (request.error.errorType === 'missing') {
					this.newCompanyFormError.missing = true;
				} else if (request.error.errorType === 'not_found') {
					this.newCompanyFormError.not_found = true;
				}
				console.error('Erreur lors de la connexion :', request);
			},
		});
	}

	restoreCompany() {
		this.resetMessage();
		this.CompanyService.restoreCompany(this.newCompanyForm).subscribe({
			next: (data: any) => {
				this.successMessage = data.message;
			},
			error: (request) => {
				if (request.error.errorType === 'missing') {
					this.newCompanyFormError.missing = true;
				} else if (request.error.errorType === 'not_found') {
					this.newCompanyFormError.not_found = true;
				}
				console.error('Erreur lors de la connexion :', request);
			},
		});
	}

	resetMessage() {
		this.successMessage = null;
		this.tempPassword = null;
		this.generatedLink = null;
		this.newCompanyFormError = {
			exist_company: false,
			missing: false,
			exist_user: false,
			not_found: false,
		};
	}

	reset() {
		this.newCompanyForm = { companyName: 'test' };
		this.resetMessage();
	}
}
