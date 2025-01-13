import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TabService } from '../services/tab.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from '../shared/services/toast.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-transfer',
  // imports: [],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, MatSnackBarModule],
  templateUrl: './new-transfer.component.html',
  styleUrl: './new-transfer.component.scss'
})
export class NewTransferComponent {
  activeTab$: any;
  // expirationTime = 30 * 60;
  formattedTime: string = '';
  private timerSubscription: Subscription | null = null;

  private intervalId: any;

  constructor(private router: Router,
    private tabService: TabService, private fb: FormBuilder, private snackBar: MatSnackBar,
    private toastService: ToastService) {

    this.activeTab$ = this.tabService.activeTab$;
  }
  ngOnInit() {
    // Subscribe to the timer observable to get updates
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

}
