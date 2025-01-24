import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';

interface ConfirmCompanyForm {
	companyId: string | number;
	companyName: string;
	fname: string;
	lname: string;
	pseudonyme: string;
	email: string;
	password: string;
	phone: string;
	address: string;
	siret: number;
	numberOfEmployees: number;
	gender: string;
}

@Component({
	selector: 'app-confirm-company',
	templateUrl: './confirm-company.component.html',
})
export class ConfirmCompanyComponent implements OnInit {
	confirmCompanyForm: ConfirmCompanyForm = {
		companyId: null,
		companyName: null,
		fname: null,
		lname: null,
		pseudonyme: null,
		email: null,
		password: null,
		phone: null,
		address: null,
		siret: null,
		numberOfEmployees: null,
		gender: null,
	};

	confirmCompanyFormError: any = {
		missing: false,
		company_not_found: false,
		bot: false,
		format: false,
	};

	successMessage: string | null = null;
	tempPassword: string | null = null;
	isSamePassword: boolean = true;

	constructor(private CompanyService: CompanyService) {}

	ngOnInit(): void {
		this.getConfirmCompanyForm();
	}

	getConfirmCompanyForm() {
		this.CompanyService.getConfirmCompanyForm().subscribe({
			next: (data) => {
				if (data.response) {
					// Met à jour le formulaire avec les données récupérées
					data.confirmCompanyForm.numberOfEmployees = parseInt(
						data.confirmCompanyForm.numberOfEmployees
					);
					this.confirmCompanyForm = {
						...this.confirmCompanyForm,
						...data.confirmCompanyForm, // Remplace uniquement les champs qui existent dans les données récupérées
					};
					this.tempPassword = data.confirmCompanyForm.password;
				}
			},
			error: (request) => {
				if (request.error.errorType === 'missing') {
					this.confirmCompanyFormError.missing = true;
				} else if (request.error.errorType === 'not_found') {
					this.confirmCompanyFormError.not_found = true;
				}
				console.error('Erreur de requête:', request);
			},
		});
	}

	confirmCompany() {
		this.successMessage = null;
		this.CompanyService.confirmCompany(this.confirmCompanyForm).subscribe({
			next: (data) => {
				if (data.response) {
					if (
						data.message === 'Formulaire de confirmation validé !'
					) {
						this.successMessage =
							'Inscription validé 🙂 ! Redirection en cours...';
						setTimeout(() => {
							this.CompanyService.companyLogout();
						}, 5000);
					} else if (
						data.message ===
						'Formulaire de confirmation enregistré !'
					) {
						this.successMessage = 'Formulaire enregistré !';
					}
				}
			},
			error: (request) => {
				if (request.error.errorType === 'bot') {
					this.confirmCompanyFormError.bot = true;
				} else if (request.error.errorType === 'format') {
					this.confirmCompanyFormError.format = true;
				} else if (request.error.errorType === 'company_not_found') {
					this.confirmCompanyFormError.company_not_found = true;
				}
				console.error('Erreur de requête:', request);
			},
		});
	}

	companyLogout() {
		this.CompanyService.companyLogout(this.confirmCompanyForm.companyName);
	}

	toggleSamePassword() {
		this.isSamePassword = !this.isSamePassword;
		console.log('tempPassword:', this.tempPassword);
		if (this.isSamePassword) {
			this.confirmCompanyForm.password = this.tempPassword;
		} else {
			this.confirmCompanyForm.password = null;
		}
	}
}
