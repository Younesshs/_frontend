export interface Vehicle {
	navigation: {
		showDetails: boolean;
	};
	options: {
		autoGpsEnabled: boolean;
	};
	gpsTracker: {
		initialLocation: {
			latitude: string;
			longitude: string;
		};
		lastLocation: {
			latitude: string;
			longitude: string;
			timestamp: string;
		};
		locationHistory?: {
			latitude: string;
			longitude: string;
			timestamp: string;
		};
		number: string;
	};
	vehicleInformations: {
		licensePlate: string;
		year: number;
		capacity: number;
		color: string;
		manufacturer: string;
		model: string;
	};
	assignedEmployee: {
		id: number;
		name: string;
		role: string;
		phoneNumber: string;
		email: string;
	};
	vehicleStatus: {
		engineOn: boolean;
	};
}
