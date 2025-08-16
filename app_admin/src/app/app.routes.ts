import { Routes } from '@angular/router';
import { AddTrip } from './add-trip/add-trip';
import { TripListing } from './trip-listing/trip-listing';
import { EditTrip } from './edit-trip/edit-trip';

export const routes: Routes = [
  { path: 'add-trip', component: AddTrip },
  { path: 'edit-trip', component: EditTrip },
  { path: '', component: TripListing, pathMatch: 'full' }
];
