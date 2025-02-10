import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TabService } from '../../services/tab.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: 'navbar.component.scss'
})
export class NavbarComponent {
  activeTab$: any;
  

  constructor(
    private router: Router,
    private tabService: TabService
  ) {
    this.activeTab$ = this.tabService.activeTab$;
  }

  navigateToCard() {
    this.tabService.setActiveTab('card');
    this.router.navigate(['/card']);
  }

  navigateToNewTransfer() {
    this.tabService.setActiveTab('newTransfer');
    this.router.navigate(['/transfer']);
  }
}
