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
  constructor(private http: HttpClient) {}
  
  private activeTabSubject = new BehaviorSubject<string>('card');
  activeTab$ = this.activeTabSubject.asObservable();

  setActiveTab(tab: string) {
    this.activeTabSubject.next(tab);
  }

  getAdminDetails(): Observable<any> {
    return this.http.post<any>('https://28f2-197-211-43-250.ngrok-free.app/api/v1/nowNowVirtualAccount', {
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
}
