import { Component, OnInit, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-card',
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard implements OnInit {
  @Input('trip') trip: any;
  constructor(){}
  ngOnInit(): void {
    
  }

}
