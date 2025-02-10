import {  Routes } from '@angular/router';
import { TransferComponent } from './transfer/transfer.component';
import { CardComponent } from './card/card.component';
import { LandingComponent } from './landing/landing.component';
import { NewTransferComponent } from './new-transfer/new-transfer.component';
import { OtpComponent } from './otp/otp.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
    { path: 'old-transfer', component: TransferComponent },
  { path: 'card', component: CardComponent },
  { path: 'transfer', component: NewTransferComponent },
  { path: 'otp', component: OtpComponent },
  // { path: '', redirectTo: '/transfer', pathMatch: 'full' },
];
