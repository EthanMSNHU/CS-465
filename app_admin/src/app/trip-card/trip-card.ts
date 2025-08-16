import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.html',
  styleUrls: ['./trip-card.css']
})
export class TripCardComponent implements OnInit {
  @Input() trip: any;

  constructor(
    private router: Router,
    private authentication: Authentication
  ) {}

  ngOnInit(): void {}

  public isLoggedIn(): boolean {
    return this.authentication.isLoggedIn();
  }
}
