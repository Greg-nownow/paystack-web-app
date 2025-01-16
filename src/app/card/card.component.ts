import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabService } from '../services/tab.service';
import { ToastService } from '../shared/services/toast.service';
import { CommonModule } from '@angular/common';
// import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true
})
export class CardComponent implements OnInit, OnDestroy {
  activeTab$: any;
  private readonly SESSION_TIMEOUT = 600000; // 10 minutes
  private sessionTimer: any;
  cardForm!: FormGroup;

  

  constructor(
    private router: Router,
    private tabService: TabService,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    this.activeTab$ = this.tabService.activeTab$;
    this.initForm();
    
  }


  ngOnInit() {
    this.startSessionTimer();
    this.initializeFormDefaults();
    
  }

  ngOnDestroy() {
    this.clearSensitiveData();
    if (this.sessionTimer) {
      clearTimeout(this.sessionTimer);
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

  maskCardNumber(event: any) {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length > 16) {
      input = input.substr(0, 16);
    }
    const masked = input.replace(/(\d{4})/g, '$1 ').trim();
    console.log(masked);
    event.target.value = masked;
    this.cardForm.patchValue({ cardNumber: input }, { emitEvent: false });
  }

  formatExpiryDate(event: any) {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length >= 2) {
      input = input.substr(0, 2) + '/' + input.substr(2);
    }
    event.target.value = input;
  }

  initiatePayStack() {
    // if (this.cardForm.valid) {
    //   const securePayload = this.prepareSecurePayload();
    //   // Implement PayStack integration here
    //   this.toastService.show(true);
    // }
    console.log(this.cardForm.value);
  }

  private startSessionTimer() {
    this.sessionTimer = setTimeout(() => {
      this.navigateToNewTransfer();
      this.clearSensitiveData();
    }, this.SESSION_TIMEOUT);
  }

  private clearSensitiveData() {
    this.cardForm.reset();
  }

  private prepareSecurePayload() {
    const formValue = this.cardForm.value;
    return {
      reference: formValue.paymentReference,
      name: formValue.fullName,
      cardLastFour: formValue.cardNumber.slice(-4),
      expiryMonth: formValue.expirationDate.split('/')[0],
      expiryYear: formValue.expirationDate.split('/')[1]
    };
  }

  private initializeFormDefaults() {
    this.cardForm.patchValue({
      paymentReference: '45417280',
      fullName: 'John Jane Doe'
    });
  }

  private initForm(): void {
    this.cardForm = this.fb.group({
      paymentReference: ['', [Validators.required, Validators.pattern('^[0-9]{8,12}$')]],
      fullName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expirationDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{2})$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
    });
  }
}
