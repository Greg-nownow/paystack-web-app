import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent {
  @Output() otpSubmitted = new EventEmitter<string>();
  otp: string = '';
  timer: string = ''; 
  canResend: boolean = false;
  otpDigits: string[] = ['', '', '', '', '', ''];
  private timerInterval: any;
  private countdownTime: number = 30; 

  constructor(private router: Router){

  }
  
  ngOnInit() {
    this.startTimer();
  }
  startTimer() {
    this.canResend = false;
    let timeLeft = this.countdownTime;
    
    this.timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        this.timer = `${timeLeft} seconds`;
      } else {
        this.canResend = true;
        this.timer = '';
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  resendOtp() {
    if (this.canResend) {
      this.otp = '';
      this.startTimer();
    }
  }

  onSubmit() {
    if (this.isOtpComplete()) {
      this.otp = this.otpDigits.join('');
      this.otpSubmitted.emit(this.otp);
      this.router.navigate(['/']);
    }
  }


  onDigitInput(event: any, index: number) {
    const value = event.target.value;
    
    if (value.length >= 1) {
      this.otpDigits[index] = value[value.length - 1];
      if (index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  }

  onBackspace(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  }

  isOtpComplete(): boolean {
    return this.otpDigits.every(digit => digit !== '');
  }
  
}
