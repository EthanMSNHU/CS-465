import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripData {
  private tripsUrl = 'http://localhost:3000/api/trips';
  private baseUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  // ---------------- Trip API ----------------

  // Get all trips (public - no token required)
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl);
  }

  
  getTripByCode(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.tripsUrl}/${tripCode}`);
  }

  // Add a trip (requires JWT)
  addTrip(formData: Trip): Observable<Trip> {
    const token = this.storage.getItem('travlr-token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post<Trip>(this.tripsUrl, formData, { headers });
  }

  // Update a trip (requires JWT)
  updateTrip(formData: Trip): Observable<Trip> {
    console.log('Inside TripData::updateTrip');
    const token = this.storage.getItem('travlr-token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.put<Trip>(`${this.tripsUrl}/${formData.code}`, formData, { headers });
  }

  // ---------------- Authentication API ----------------

  login(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('login', user, passwd);
  }

  register(user: User, passwd: string): Observable<AuthResponse> {
    return this.handleAuthAPICall('register', user, passwd);
  }

  private handleAuthAPICall(endpoint: string, user: User, passwd: string): Observable<AuthResponse> {
    const formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };

    return this.http.post<AuthResponse>(`${this.baseUrl}/${endpoint}`, formData);
  }
}
