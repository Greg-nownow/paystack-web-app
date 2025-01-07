import {  Routes } from '@angular/router';
import { TransferComponent } from './transfer/transfer.component';
import { CardComponent } from './card/card.component';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
    { path: 'transfer', component: TransferComponent },
  { path: 'card', component: CardComponent },
  // { path: '', redirectTo: '/transfer', pathMatch: 'full' },
];
