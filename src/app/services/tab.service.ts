import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

interface AdminDetails {
  accountNumber: string;
  accountName: string;
  bankName: string;
  amount: number;
  fullName: string;
  paymentReference: number;
}

@Injectable({
  providedIn: 'root'
})
export class TabService {
  private activeTabSubject = new BehaviorSubject<string>('card');
  activeTab$ = this.activeTabSubject.asObservable();
  private expirationTimeInSeconds = 30 * 60 + 30; // Initial countdown value
  private lastUpdatedTimestamp: number = Date.now(); // Tracks when the timer was last updated

  private timerSubject = new BehaviorSubject<string>('');
  public timer$ = this.timerSubject.asObservable();

  constructor(private http: HttpClient) {
    this.updateCountdown(); // Initialize the countdown
    setInterval(() => this.updateCountdown(), 1000); // Update timer every second
  }
  
    // Method to update the countdown and calculate the remaining time
    private updateCountdown() {
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - this.lastUpdatedTimestamp) / 1000);
  
      const remainingTime = this.expirationTimeInSeconds - elapsedSeconds;
      if (remainingTime >= 0) {
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        this.timerSubject.next(`${minutes} mins ${seconds < 10 ? '0' : ''}${seconds} secs`);
      } else {
        this.timerSubject.next('Expired');
      }
    }

  setActiveTab(tab: string) {
    this.activeTabSubject.next(tab);
  }

  getAdminDetails(): Observable<any> {
    // https://9345-41-204-243-98.ngrok-free.app
    return this.http.post<any>('https://9345-41-204-243-98.ngrok-free.app/api/v1/nowNowVirtualAccount', {
      "paymentRef": "00000001",
      "amount": 10000,
      "customerRef": "2348022250132",
      "firstname": "John",
      "lastname": "Doe",
      "email": "string",
      "mobileNumber": "2348022250132",
      "middleName": "Jane",
      "dob": "2024-12-16",
      "gender": "M",
      "title": "Mr",
      "addressLine1": "239/241 Ikorodu Rd",
      "addressLine2": "Ilupeju",
      "city": "Mushin",
      "state": "Lagos State",
      "country": "Nigeria",
      "productCode": "104",
      "requestIn": "2024-12-16"
  })
     .pipe(
        map(response => response),
        catchError(error => of({
          accountNumber: "",
          accountName: "",
          bankName: "",
          amount: 0,
          fullName: "",
          paymentReference: 0
        }))
      );
  }

  submitTransfer(amount: number) {
    const payload = {
      requestRef: "00000001",
      amount: amount,
      customerRef: "2348022250132",
      firstname: "John",
      lastname: "Doe",
      email: "string",
      mobileNumber: "2348022250132",
      middleName: "Jane",
      dob: "2024-12-16",
      gender: "M",
      title: "Mr",
      addressLine1: "239/241 Ikorodu Rd",
      addressLine2: "Ilupeju",
      city: "Mushin",
      state: "Lagos State",
      country: "Nigeria",
      productCode: "104",
      requestIn: "2024-12-16"
    };
    return of({
      "status": true,
      "code": 200,
      "message": "Successfully | Successfully",
      "data": {
        "accountNumber": "3004357798",
        "accountName": "NowNow - John Jane Doe",
        "bankName": "NowNow"
      }
    })

    // return this.http.post('http://localhost:1050/api/v1/nowNowVirtualAccount', payload);
  }

  cardTransactionInitialize(payload: any){
      const reqPayload = {
        "transactionReference": payload.transactionReference,
        "cvv": payload.cvv,
        "cardNo": payload.cardNo,
        "amount": payload.amount,
        "cardPin": payload.cardPin,
        "cardExpiryDate": payload.cardExpiryDate
      }

      return this.http.post<any>('https://2897-105-112-198-83.ngrok-free.app/api/v1/transaction/initialize', reqPayload)
  }
}
