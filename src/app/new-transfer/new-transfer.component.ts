import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TabService } from '../services/tab.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../shared/services/toast.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-new-transfer',
  standalone: true,
  // imports: [],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, MatSnackBarModule, NavbarComponent],
  templateUrl: './new-transfer.component.html',
  styleUrl: './new-transfer.component.scss'
})
export class NewTransferComponent {
  activeTab$: any;
  formattedTime: string = '';
  accountNumber: number = 0;
  accountName: string = '';
  bankName: string = '';
  transactionReference: string = '';
  isLoading: boolean = false;
  private timerSubscription: Subscription | null = null;

  constructor(private router: Router,
    private tabService: TabService, private toastService: ToastService) {

    this.activeTab$ = this.tabService.activeTab$;
  }
  ngOnInit() {
    // Subscribe to the timer observable to get updates
    this.transactionReference = this.tabService.transactionReference;
    this.fetchCurrentTransactionDetails()
    this.timerSubscription = this.tabService.timer$.subscribe(
      (time) => {
        this.formattedTime = time;
      }
    );
  }

  ngOnDestroy() {
    // Unsubscribe from the timer observable to prevent memory leaks
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
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

  fetchCurrentTransactionDetails(){
    this.isLoading = true;
    this.tabService.generateApiKey().subscribe((res) => {
      const { apiKey } = res.data;
      this.tabService.getAdminDetails(apiKey).subscribe((details) => {
        this.isLoading = false;
        this.accountNumber = details.data.accountNumber;
        this.accountName = details.data.accountName;
        this.bankName = details.data.bankName;
      });
    });
  }
  submitTransfer(){
    this.toastService.showSuccessToast('Transfer Successful');
  }

}
