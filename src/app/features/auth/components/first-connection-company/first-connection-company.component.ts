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
		companyName: 'you services',
		password: 'you services-1736005046',
	};
	firstConnectionCompanyFormError: any = {
		wrong: false,
		bot: false,
		format: false,
		notFound: false,
		companyConfirmed: false,
	};

	constructor(
		private Router: Router,
		private route: ActivatedRoute,
		private CompanyService: CompanyService
	) {}

	ngOnInit(): void {
		if (this.CompanyService.getCompanyToken()) {
			this.Router.navigate(['auth/confirm-company']);
		}

		this.route.paramMap.subscribe((params) => {
			this.firstConnectionCompanyForm.companyName =
				params.get('companyName');
		});
	}

	firstConnectionCompany() {
		this.firstConnectionCompanyFormError = {
			wrong: false,
			bot: false,
			format: false,
			notFound: false,
			companyConfirmed: false,
		};

		this.CompanyService.firstConnectionCompany(
			this.firstConnectionCompanyForm
		).subscribe({
			next: (data: any) => {
				if (data.response) {
					if (!data.companyIsConfirmed) {
						this.CompanyService.setCompanyToken(
							data.companyToken,
							data.companyExpiration,
							data.companyId,
							data.companyName,
							data.companyCreatedAt
						);
						console.info('connected...');
						this.Router.navigate(['auth/confirm-company']);
					} else {
						console.error('Company already confirmed');
						this.firstConnectionCompanyFormError.companyConfirmed =
							true;
					}
				}
			},
			error: (request) => {
				console.error(
					'Erreur lors de la connexion "firstConnectionCompany" :',
					request
				);
				if (request.error.errorType === 'wrong') {
					this.firstConnectionCompanyFormError.wrong = true;
				} else if (request.error.errorType === 'bot') {
					this.firstConnectionCompanyFormError.bot = true;
				} else if (request.error.errorType === 'missing') {
					this.firstConnectionCompanyFormError.format = true;
				} else if (request.error.errorType === 'not_found') {
					this.firstConnectionCompanyFormError.notFound = true;
				}
			},
		});
	}
}
