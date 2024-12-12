import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/services/auth.service';

export const LoginGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthService);
	const router = inject(Router);

	const token = authService.getToken();

	if (token) {
		// TODO: Dans un vrai cas, vérifiez si le token est encore valide
		return true;
	} else {
		router.navigate(['/auth']);
		return false;
	}
};
