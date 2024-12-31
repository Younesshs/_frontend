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
	errorMessage: string | null = null;
	successMessage: string | null = null;
	tempPassword: string | null = null;
	generatedLink: string | null = null;

	constructor(private CompanyService: CompanyService) {}

	addCompany() {
		this.CompanyService.addCompany(this.newCompanyForm).subscribe({
			next: (data: any) => {
				this.errorMessage = null; // Réinitialise le message d'erreur
				this.successMessage = null; // Réinitialise le message de succès

				if (data.message === 'Cette entreprise existe déjà !') {
					this.newCompanyForm.name = '';
					this.errorMessage = data.message;
				} else if (data.message === 'Entreprise créé avec succès !') {
					this.successMessage = data.message;
					this.tempPassword = data.tempPassword;
					this.generatedLink = `localhost/auth/confirm-company?token=UNIQUE_TOKEN}`;
				}
			},
			error: (error) => {
				console.error('Erreur lors de la connexion :', error);
			},
		});
	}
}
// TODO: Insérer un compte / crée la page inscr #2 (Ne pas donner accès au tableau sans avoir complétés les infos$)
