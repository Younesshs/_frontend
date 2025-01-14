import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';

interface ConfirmCompanyForm {
	companyId: string | number;
	companyName: string;
	fname: string;
	lname: string;
	pseudonym: string;
	email: string;
	password: string;
	phone: string;
	address: string;
	siret: string;
	logo: string;
	numberOfEmployees: number;
	gender: string;
}

@Component({
	selector: 'app-confirm-company',
	templateUrl: './confirm-company.component.html',
})
export class ConfirmCompanyComponent implements OnInit {
	confirmCompanyForm: ConfirmCompanyForm = {
		companyId: '677955b606728b289ded05c1',
		companyName: 'you services',
		fname: 'youness',
		lname: 'haddou',
		pseudonym: 'youyou',
		email: 'contact@youservices.com',
		password: 'you services-1736005046',
		phone: '0656691615',
		address: '62 chemin de la croix verte',
		siret: '1736005046',
		logo: 'assets/images/company/youservices.png',
		numberOfEmployees: 5,
		gender: 'male',
	};

	confirmCompanyFormError: any = {
		bot: false,
		format: false,
	};

	companyInformations!: any;

	constructor(private CompanyService: CompanyService) {}

	confirmCompany() {
		console.log('confirmCompanyForm', this.confirmCompanyForm);
		this.confirmCompanyFormError.bot = true;
	}

	ngOnInit(): void {
		this.companyInformations = this.CompanyService.getCompanyInformations();
	}

	companyLogout() {
		this.CompanyService.companyLogout(this.companyInformations.name);
	}
}
