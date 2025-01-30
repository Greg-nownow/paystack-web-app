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
  cardForm!: FormGroup;
  cardType: string = '';
  cardTypeIcon: string = 'assets/icons/credit-card.png';
  amount: number = 5000.00;
  transactionReference: string = '';
  private readonly SESSION_TIMEOUT = 600000; // 10 minutes
  private sessionTimer: any;
  private readonly CARD_PATTERNS = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    verve: /^506[0-1]|^507[8-9]|^6500/
  };

  

  constructor(
    private router: Router,
    private tabService: TabService,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    // this.transactionReference = `TRX${Math.random().toString(36).substr(2, 9)}`;
    this.activeTab$ = this.tabService.activeTab$;
    this.initForm();
    
  }


  ngOnInit() {
    this.transactionReference = this.tabService.transactionReference;
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
    if (input.length > 20) {
      input = input.substr(0, 20);
    }
    const masked = input.replace(/(\d{4})/g, '$1 ').trim();
    console.log(masked);
    event.target.value = masked;
    this.cardForm.patchValue({ cardNumber: input }, { emitEvent: false });
    this.detectCardType(input);
  }

  formatExpiryDate(event: any) {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length >= 2) {
      input = input.substr(0, 2) + '/' + input.substr(2);
    }
    event.target.value = input;
  }

  initiatePayStack() {
    console.log(this.cardForm.value);
  }

  // Add this method to detect card type
detectCardType(cardNumber: string) {
  const cleanNumber = cardNumber.replace(/\D/g, '');

  this.cardForm.get('cardPin')?.reset();
  
  if (this.CARD_PATTERNS.visa.test(cleanNumber)) {
    this.cardType = 'visa';
    this.cardTypeIcon = 'assets/icons/visa.svg';
  } else if (this.CARD_PATTERNS.mastercard.test(cleanNumber)) {
    this.cardType = 'mastercard';
    this.cardTypeIcon = 'assets/icons/mastercard.svg';
  } else if (this.CARD_PATTERNS.verve.test(cleanNumber)) {
    this.cardType = 'verve';
    this.cardTypeIcon = 'assets/icons/verve.png';
  } else {
    this.cardType = '';
    this.cardTypeIcon = 'assets/icons/credit-card.png';
  }
}

isPinRequired(): boolean {
  return this.cardType === 'mastercard' || this.cardType === 'verve';
}

cardTransactionInitialize(){
  const formValue = this.cardForm.value;
  const transactionPayload = {
    transactionReference: this.transactionReference,
    cvv: formValue.cvv,
    cardNo: formValue.cardNumber.replace(/\s/g, ''),
    amount: this.amount,
    cardPin: this.isPinRequired() ? formValue.cardPin : undefined,
    cardExpiryDate: formValue.expirationDate,
    cardType: this.cardType,
    expiryMonth: formValue.expirationDate.split('/')[0],
    expiryYear: formValue.expirationDate.split('/')[1]
  };
  this.tabService.cardTransactionInitialize(transactionPayload).subscribe({ 
    next: (res)=>{
      console.log(res);
      const { data, message } = res;
      if(data.status){
        // this.toastService.showSuccessToast(data?.message);
        // this.navigateToTransfer();
        console.log(data.status, 'status')
        switch(data.data.status){
          case 'send_otp':
            const extras = { state: { reference: data.data.reference } };
            this.router.navigate(['/otp'], extras);
            break;
          case 'success':
            this.toastService.showSuccessToast(message);
            break;
          default:
            this.toastService.showSuccessToast(message);
            break;
        }

        
      }else{
        this.toastService.showErrorToast(data?.message);
      }
    }, 
    error: (err)=>{
      console.log(err);
      // this.router.navigate(['/otp']);
      this.toastService.showErrorToast(err?.message);
    }
  })
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
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      expirationDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{2})$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
      cardPin: ['', [Validators.pattern('^[0-9]{4}')]]
    });
  }

  
}
