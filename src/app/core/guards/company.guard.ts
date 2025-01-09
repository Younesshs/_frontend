import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CompanyService } from 'src/app/features/auth/services/company.service';

export const CompanyGuard: CanActivateFn = (route, state) => {
	const companyService = inject(CompanyService);
	// const router = inject(Router);

	const companyToken = companyService.getCompanyToken();

	if (companyToken) {
		// TODO: Dans un vrai cas, vérifiez si le token est encore valide
		return true;
	} else {
		companyService.companyLogout();
		return false;
	}
};
