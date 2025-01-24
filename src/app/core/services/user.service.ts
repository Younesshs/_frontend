import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor() {}

	getName() {
		const lastname = localStorage.getItem('lastname');
		const firstname = localStorage.getItem('firstname');
		return lastname + ' ' + firstname;
	}

	setName(lastname: string, firstname: string) {
		localStorage.setItem('lastname', lastname);
		localStorage.setItem('firstname', firstname);
	}

	setUserInformations(lastname: string, firstname: string, userRole: string) {
		localStorage.setItem('lastname', lastname);
		localStorage.setItem('firstname', firstname);
		localStorage.setItem('userRole', userRole);
	}

	getRole(): string | null {
		return localStorage.getItem('userRole');
	}

	hasRole(requiredRole: string): boolean {
		const userRole = this.getRole();
		return userRole === requiredRole;
	}

	deleteUserInformations() {
		localStorage.removeItem('lastname');
		localStorage.removeItem('firstname');
		localStorage.removeItem('userRole');
	}
}
