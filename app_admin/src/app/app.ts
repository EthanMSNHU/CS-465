import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { TripListing } from './trip-listing/trip-listing';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, TripListing], 
  templateUrl: './app.html',
  styleUrls: ['./app.css'] 
})
export class AppComponent {
  title = 'Travlr Getaways Admin!';
}