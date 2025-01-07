import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TabService } from '../services/tab.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastService } from '../shared/services/toast.service';
@Component({
  selector: 'app-transfer',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, MatSnackBarModule],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.scss'
})
export class TransferComponent implements OnInit {
  activeTab$: any;
  transferForm: FormGroup;
  adminDetails = {
    accountNumber: '',
    accountName: '',
    bankName: ''
  };
  isProcessing = false
  constructor(private router: Router,
    private tabService: TabService, private fb: FormBuilder, private snackBar: MatSnackBar,
    private toastService: ToastService) {

      this.activeTab$ = this.tabService.activeTab$;
      this.transferForm = this.fb.group({
        accountNumber: [{value: '', disabled: true}, Validators.required],
        accountName: [{value: '', disabled: true}, Validators.required],
        bankName: [{value: '', disabled: true}, Validators.required],
        amount: ['', [Validators.required, Validators.min(1)]],
        paymentReference: ['', Validators.required],
        fullName: [{value: '', disabled: true}, Validators.required],
      });
     }

     ngOnInit() {
      this.fetchAdminDetails();
    }
  
    fetchAdminDetails() {
      this.tabService.getAdminDetails().subscribe(details => {
        console.log(details.data);
        this.adminDetails = details.data;
        this.transferForm.patchValue({
          accountNumber: this.adminDetails?.accountNumber,
          accountName: this.adminDetails?.accountName,
          bankName: this.adminDetails?.bankName,
          amount: 1000,
          paymentReference: 45417280,
          fullName: "John Jane Doe",
        });
      });
    }

     navigateToCard() {
      this.tabService.setActiveTab('card');
      this.router.navigate(['/card']);
    }
  
    navigateToTransfer() {
      this.tabService.setActiveTab('transfer');
      this.router.navigate(['/transfer']);
    }

    onSubmit() {
      if (this.transferForm.valid) {
        this.isProcessing = true;
        
        this.tabService.submitTransfer(this.transferForm.getRawValue().amount)
          .subscribe({
            next: (response: any) => {
              // setTimeout(() => {
                this.isProcessing = false;
                // this.toastService.show('Transaction successful!<br>You are now being redirected to the homepage...');
                // this.toastService.show('<span class="success-message" >Transaction successful!</span><br><br>You are now being redirected to the homepage...');
                // this.toastService.show('<span style="color: #4CAF50 !important; font-weight: 600 !important;">Transaction successful!</span><br><br>You are now being redirected to the homepage...');
                this.toastService.show(true as any);


              
                this.tabService.setActiveTab('card');
                // this.router.navigate(['/']);
              // }, 2000);
            },
            error: (error) => {
              this.isProcessing = false;
              alert('Transaction failed. Please try again.');
            }
          });
      }
    }
}
