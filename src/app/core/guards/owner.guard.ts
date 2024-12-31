import { CanActivateFn } from '@angular/router';

export const OwnerGuard: CanActivateFn = (route, state) => {
	return true;
};
