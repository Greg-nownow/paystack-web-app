import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TabService } from '../services/tab.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import PaystackPop from '@paystack/inline-js'

@Component({
  selector: 'app-card',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  activeTab$: any;
  
  constructor(private router: Router,
    private tabService: TabService) {

      this.activeTab$ = this.tabService.activeTab$;
     }
    
  navigateToCard() {
    this.tabService.setActiveTab('card');
    this.router.navigate(['/card']);
  }

  navigateToTransfer() {
    this.tabService.setActiveTab('transfer');
    this.router.navigate(['/transfer']);
  }

  navigateToNewTransfer() {
    this.tabService.setActiveTab('newTransfer');
    this.router.navigate(['/new-transfer']);
  }

  initiatePayStack(){
    // const access_code = { accessCode: '32323242324232424232423' }
    // const popup = new PaystackPop();
    // popup.resumeTransaction(access_code)
  }
}
