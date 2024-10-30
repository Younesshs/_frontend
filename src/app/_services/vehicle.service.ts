import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LeafletData } from '../_models/leaflet-data';

@Injectable({
	providedIn: 'root',
})
export class VehicleService {
	private apiUrl = environment.backendUrl;

	leafletData!: LeafletData;

	vehicles = [
		{
			showDetails: false,
			options: {
				autoGpsEnabled: false,
			},
			gps_tracker_number: '600000001',
			vehicle_informations: {
				license_plate: 'AB-123-CD',
				year: 2012,
				capacity: 5,
				color: 'blue',
				manufacturer: 'citroen',
				car_model: 'c3',
			},
			assigned_employee: {
				employee_id: 2,
				name: 'Paul MARTIN',
				role: 'chauffeur',
				phone_number: '+33611111111',
				email: 'paul.martin@locate-them.fr',
			},
			vehicle_status: {
				engine_on: false,
				current_location: {
					latitude: 43.6045,
					longitude: 1.444,
					timestamp: '2024-10-29T13:55:00.808Z',
				},
			},
		},
		{
			showDetails: false,
			options: {
				autoGpsEnabled: false,
			},
			gps_tracker_number: '600000002',
			vehicle_informations: {
				license_plate: 'XY-456-ZT',
				year: 2016,
				capacity: 7,
				color: 'white',
				manufacturer: 'peugeot',
				car_model: '5008',
			},
			assigned_employee: {
				employee_id: 3,
				name: 'Sophie DURAND',
				role: 'chauffeur',
				phone_number: '+33622222222',
				email: 'sophie.durand@locate-them.fr',
			},
			vehicle_status: {
				engine_on: false,
				current_location: {
					latitude: 43.6037,
					longitude: 1.452,
					timestamp: '2024-10-29T13:55:00.808Z',
				},
			},
		},
		{
			showDetails: false,
			options: {
				autoGpsEnabled: false,
			},
			gps_tracker_number: '600000003',
			vehicle_informations: {
				license_plate: 'ZX-789-BY',
				year: 2020,
				capacity: 5,
				color: 'black',
				manufacturer: 'renault',
				car_model: 'clio',
			},
			assigned_employee: {
				employee_id: 4,
				name: 'Amélie BONNET',
				role: 'chauffeur',
				phone_number: '+33633333333',
				email: 'amelie.bonnet@locate-them.fr',
			},
			vehicle_status: {
				engine_on: false,
				current_location: {
					latitude: 43.6087,
					longitude: 1.443,
					timestamp: '2024-10-29T13:55:00.808Z',
				},
			},
		},
		{
			showDetails: false,
			options: {
				autoGpsEnabled: false,
			},
			gps_tracker_number: '600000004',
			vehicle_informations: {
				license_plate: 'MN-654-RD',
				year: 2018,
				capacity: 9,
				color: 'grey',
				manufacturer: 'mercedes',
				car_model: 'vito',
			},
			assigned_employee: {
				employee_id: 5,
				name: 'Julien LEROY',
				role: 'chauffeur',
				phone_number: '+33644444444',
				email: 'julien.leroy@locate-them.fr',
			},
			vehicle_status: {
				engine_on: false,
				current_location: {
					latitude: 43.607,
					longitude: 1.45,
					timestamp: '2024-10-29T13:55:00.808Z',
				},
			},
		},
		{
			showDetails: false,
			options: {
				autoGpsEnabled: false,
			},
			gps_tracker_number: '600000005',
			vehicle_informations: {
				license_plate: 'QR-852-JK',
				year: 2015,
				capacity: 4,
				color: 'green',
				manufacturer: 'ford',
				car_model: 'fiesta',
			},
			assigned_employee: {
				employee_id: 6,
				name: 'Emma MARTINEZ',
				role: 'chauffeur',
				phone_number: '+33655555555',
				email: 'emma.martinez@locate-them.fr',
			},
			vehicle_status: {
				engine_on: false,
				current_location: {
					latitude: 43.599,
					longitude: 1.437,
					timestamp: '2024-10-29T13:55:00.808Z',
				},
			},
		},
		{
			showDetails: false,
			options: {
				autoGpsEnabled: false,
			},
			gps_tracker_number: '600000006',
			vehicle_informations: {
				license_plate: 'LP-963-QW',
				year: 2014,
				capacity: 6,
				color: 'silver',
				manufacturer: 'opel',
				car_model: 'zafira',
			},
			assigned_employee: {
				employee_id: 7,
				name: 'Antoine LEBLANC',
				role: 'chauffeur',
				phone_number: '+33666666666',
				email: 'antoine.leblanc@locate-them.fr',
			},
			vehicle_status: {
				engine_on: false,
				current_location: {
					latitude: 43.612,
					longitude: 1.448,
					timestamp: '2024-10-29T13:55:00.808Z',
				},
			},
		},
		{
			showDetails: false,
			options: {
				autoGpsEnabled: false,
			},
			gps_tracker_number: '600000007',
			vehicle_informations: {
				license_plate: 'TS-741-GF',
				year: 2021,
				capacity: 5,
				color: 'yellow',
				manufacturer: 'toyota',
				car_model: 'yaris',
			},
			assigned_employee: {
				employee_id: 8,
				name: 'Nina DUBOIS',
				role: 'chauffeur',
				phone_number: '+33677777777',
				email: 'nina.dubois@locate-them.fr',
			},
			vehicle_status: {
				engine_on: false,
				current_location: {
					latitude: 43.605,
					longitude: 1.441,
					timestamp: '2024-10-29T13:55:00.808Z',
				},
			},
		},
		{
			showDetails: false,
			options: {
				autoGpsEnabled: false,
			},
			gps_tracker_number: '600000008',
			vehicle_informations: {
				license_plate: 'GH-258-RL',
				year: 2019,
				capacity: 5,
				color: 'black',
				manufacturer: 'audi',
				car_model: 'a3',
			},
			assigned_employee: {
				employee_id: 9,
				name: 'Leo RICHARD',
				role: 'chauffeur',
				phone_number: '+33688888888',
				email: 'leo.richard@locate-them.fr',
			},
			vehicle_status: {
				engine_on: false,
				current_location: {
					latitude: 43.609,
					longitude: 1.453,
					timestamp: '2024-10-29T13:55:00.808Z',
				},
			},
		},
		{
			showDetails: false,
			options: {
				autoGpsEnabled: false,
			},
			gps_tracker_number: '600000009',
			vehicle_informations: {
				license_plate: 'BL-369-VC',
				year: 2017,
				capacity: 8,
				color: 'blue',
				manufacturer: 'volkswagen',
				car_model: 'transporter',
			},
			assigned_employee: {
				employee_id: 10,
				name: 'Clara MOREAU',
				role: 'chauffeur',
				phone_number: '+33699999999',
				email: 'clara.moreau@locate-them.fr',
			},
			vehicle_status: {
				engine_on: false,
				current_location: {
					latitude: 43.61,
					longitude: 1.447,
					timestamp: '2024-10-29T13:55:00.808Z',
				},
			},
		},
		{
			showDetails: false,
			options: {
				autoGpsEnabled: false,
			},
			gps_tracker_number: '600000010',
			vehicle_informations: {
				license_plate: 'ZR-147-WD',
				year: 2023,
				capacity: 5,
				color: 'orange',
				manufacturer: 'fiat',
				car_model: '500',
			},
			assigned_employee: {
				employee_id: 11,
				name: 'Lucas DUMONT',
				role: 'chauffeur',
				phone_number: '+33700000000',
				email: 'lucas.dumont@locate-them.fr',
			},
			vehicle_status: {
				engine_on: false,
				current_location: {
					latitude: 43.611,
					longitude: 1.439,
					timestamp: '2024-10-29T13:55:00.808Z',
				},
			},
		},
	];

	constructor(private http: HttpClient) {}

	_updateLeafletData(
		url?: string,
		attribution?: string,
		zoom?: number,
		zoomLevels?: number[],
		lat?: number,
		lng?: number
	): void {
		const updatedData = {
			url: url ?? this.leafletData.url,
			attribution: attribution ?? this.leafletData.attribution,
			zoom: zoom ?? this.leafletData.zoom,
			zoomLevels: zoomLevels ?? this.leafletData.zoomLevels,
			lat: lat ?? this.leafletData.lat,
			lng: lng ?? this.leafletData.lng,
		};

		this.leafletData = { ...this.leafletData, ...updatedData };
	}

	_getLeafletData(): LeafletData {
		return this.leafletData;
	}

	getVehicles(): Observable<any> {
		return of(this.vehicles);
		// return this.http.get(`${this.apiUrl}/vehicle/all`);
	}

	getVehicle(vehicleId: any): Observable<any> {
		return this.http.get(`${this.apiUrl}/vehicle/${vehicleId}`);
	}

	getLocation(vehicleId: any): Observable<any> {
		return this.http.get(`${this.apiUrl}/vehicle/${vehicleId}/location`);
	}

	getLocations(): Observable<any> {
		return this.http.get(`${this.apiUrl}/vehicle/locations`);
	}
}
