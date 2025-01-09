import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';

@Component({
	selector: 'app-confirm-company',
	templateUrl: './confirm-company.component.html',
})
export class ConfirmCompanyComponent implements OnInit {
	companyInformations!: any;
	constructor(private CompanyService: CompanyService) {}

	ngOnInit(): void {
		this.companyInformations = this.CompanyService.getCompanyInformations();
	}

	companyLogout() {
		this.CompanyService.companyLogout(this.companyInformations.name);
	}
}
