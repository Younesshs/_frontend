export interface Vehicle {
	vehicleId: number;
	showDetails: boolean;
	options: {
		autoGpsEnabled: boolean;
	};
	gpsTrackerNumber: string;
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
		currentLocation: {
			latitude: number;
			longitude: number;
			timestamp: string;
		};
	};
}
