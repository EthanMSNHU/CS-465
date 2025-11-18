import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component'; 
import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-trip-listing',
  standalone: true,                                   
  imports: [CommonModule, TripCardComponent],         
  templateUrl: './trip-listing.html',
  styleUrls: ['./trip-listing.css'],                  
  providers: [TripData]
})
export class TripListing implements OnInit {
  trips: Trip[] = [];                                 
  message: string = '';

  constructor(
    private tripData: TripData,
    private router: Router,
    private authenticationService: Authentication
  ) {
    console.log('trip-listing constructor');
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  private getStuff(): void {
    this.tripData.getTrips().subscribe({
      next: (value: Trip[]) => {
        this.trips = value || [];
        console.log(this.trips); // Debug output
        if (this.trips.length > 0) {
          this.message = `There are ${this.trips.length} trips available.`; // <-- FIXED
        } else {
          this.message = 'There were no trips retrieved from the database';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
        this.message = 'Error retrieving trips';
      }
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}