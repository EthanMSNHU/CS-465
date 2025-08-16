import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {trips } from '../data/trips';
import { TripCard } from '../trip-card/trip-card';
import { TripData } from '../services/trip-data';
import { Trip } from '../models/trip';
import { Router } from '@angular/router';


@Component({
  selector: 'app-trip-listing',
  imports: [CommonModule, TripCard],
  standalone: true,
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
  providers: [TripData]
})
export class TripListing implements OnInit {
  trips!: Trip[];
  message: string = '';

  constructor( 
    private tripData: TripData,
    private router : Router
  ){
console.log('trip-listing constructor');
}
  public addTrip(): void{
    this.router.navigate(['add-trip']);
    
  }
private getStuff(): void {
  this.tripData.getTrips()
    .subscribe({
      next: (value: any) => {
        this.trips = value;
        if(value.length > 0)
        {
          this.message = 'There are ' + value.length + ' trips available.';
        }
        else{
          this.message = 'There were no trips retireved from the database';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    })
}

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();  
  }
}
