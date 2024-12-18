import { Component } from '@angular/core';

interface newCompanyForm {
	name: string;
}

@Component({
	selector: 'app-new-account',
	standalone: false,
	templateUrl: './new-account.component.html',
})
export class NewAccountComponent {
	newCompanyForm: newCompanyForm = { name: 'you services' };

	addNewAccount() {
		console.log('company', this.newCompanyForm);
		// TODO: Insérer un compte / crée la page inscr #2 (Ne pas donner accès au tableau sans avoir complétés les infos$)
	}
}
