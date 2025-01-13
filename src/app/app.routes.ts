import {  Routes } from '@angular/router';
import { TransferComponent } from './transfer/transfer.component';
import { CardComponent } from './card/card.component';
import { LandingComponent } from './landing/landing.component';
import { NewTransferComponent } from './new-transfer/new-transfer.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
    { path: 'transfer', component: TransferComponent },
  { path: 'card', component: CardComponent },
  { path: 'new-transfer', component: NewTransferComponent },
  // { path: '', redirectTo: '/transfer', pathMatch: 'full' },
];
