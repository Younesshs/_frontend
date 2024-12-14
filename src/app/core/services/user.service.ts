import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor() {}

	getUserName() {
		return localStorage.getItem('username');
	}

	setUsername(name: string) {
		localStorage.setItem('username', name);
	}

	deleteUsername() {
		localStorage.removeItem('username');
	}
}
