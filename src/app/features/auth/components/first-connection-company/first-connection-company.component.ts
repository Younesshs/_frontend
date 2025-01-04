import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstConnectionCompanyForm } from 'src/app/shared/models/firstConnectionCompanyForm';
import { CompanyService } from './../../services/company.service';

@Component({
	selector: 'app-first-connection-company',
	templateUrl: './first-connection-company.component.html',
})
export class FirstConnectionCompanyComponent {
	firstConnectionCompanyForm: firstConnectionCompanyForm = {
		name: 'you services',
	};
	firstConnectionCompanyFormError: any = {
		wrong: false,
		bot: false,
	};

	companyName: string | null = null;

	constructor(
		private Router: Router,
		private route: ActivatedRoute,
		private CompanyService: CompanyService
	) {}

	ngOnInit(): void {
		if (this.CompanyService.getCompanyToken()) {
			this.Router.navigate(['/confirm-company']);
		}

		this.route.paramMap.subscribe((params) => {
			this.firstConnectionCompanyForm.name = params.get('companyName');
		});
	}

	firstConnectionCompany() {
		this.firstConnectionCompanyFormError = {
			wrong: false,
			bot: false,
		};

		this.CompanyService.firstConnectionCompany(
			this.firstConnectionCompanyForm
		).subscribe({
			next: (data: any) => {
				if (data.response) {
					this.CompanyService.setCompanyToken(
						data.token,
						data.expiration
					);
					this.CompanyService.setCompanyInformations(
						data.name,
						data.createdAt
					);
					console.info('connected...');
					this.Router.navigate(['/confirm-company']);
				} else {
					if (data.errorType === 'wrong') {
						this.firstConnectionCompanyFormError.wrong = true;
					} else if (data.errorType === 'bot') {
						this.firstConnectionCompanyFormError.bot = true;
					}
				}
			},
			error: (error) => {
				console.error(
					'Erreur lors de la connexion "firstConnectionCompany" :',
					error
				);
			},
		});
	}
}
// TODO: Insérer un compte / crée la page inscr #2 (Ne pas donner accès au tableau sans avoir complétés les infos$)
