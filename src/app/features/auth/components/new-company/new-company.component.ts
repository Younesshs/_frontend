import { Component } from '@angular/core';
import { CompanyService } from '../../services/company.service';

interface newCompanyForm {
	name: string;
}

@Component({
	selector: 'app-new-company',
	standalone: false,
	templateUrl: './new-company.component.html',
})
export class NewCompanyComponent {
	newCompanyForm: newCompanyForm = { name: 'you services' };
	newCompanyFormError = { exists: false };
	successMessage: string | null = null;
	tempPassword: string | null = null;
	generatedLink: string | null = null;

	constructor(private CompanyService: CompanyService) {}

	addCompany() {
		this.CompanyService.addCompany(this.newCompanyForm).subscribe({
			next: (data: any) => {
				this.newCompanyFormError = { exists: false }; // Réinitialise le message d'erreur
				this.successMessage = null; // Réinitialise le message de succès

				if (data.message === 'Entreprise créé avec succès !') {
					this.successMessage = data.message;
					this.tempPassword = data.tempPassword;
					this.generatedLink = `http://localhost:4200/auth/first-connection-company/${this.newCompanyForm.name}`;
				}
			},
			error: (request) => {
				if (request.error.errorType === 'exist_company') {
					this.newCompanyFormError.exists = true;
				}
				console.error('Erreur lors de la connexion :', request);
			},
		});
	}
}
