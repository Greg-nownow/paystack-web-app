import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  template: `
     <div class="container">
         <div class="card">
        <div class="logo">
          <img src="assets/icons/contec-logo.png" alt="NowNow Logo">
        </div>
        <h1>Welcome to Contec Global Payment System</h1>
        <button (click)="navigateToPayment()" class="pay-button">Pay Bills</button>
      </div>
     </div>
  `,
  styles: [`
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f5a012;
      padding: .5rem;
    }
     
    .card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
      max-width: 500px;
    }
    .logo {
      margin-bottom: 2rem;
    }
    .logo img {
      max-width: 200px;
    }
    h1 {
      color: #333;
      margin-bottom: 2rem;
    }
    .pay-button {
      background-color: #f5a012;
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 4px;
      font-size: 1.1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .pay-button:hover {
      background-color: #fff;
      color: #f5a012;
      border: 1px solid #f5a012;
    }
  `]
})
export class LandingComponent {
  constructor(private router: Router) {}

  navigateToPayment() {
    this.router.navigate(['/card']);
  }
}
