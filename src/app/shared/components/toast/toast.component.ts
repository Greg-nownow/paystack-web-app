import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
   <div class="modal-overlay" [class.show]="visible">
      <div class="modal-card">
        <div class="modal-content">
          <div class="message-container">
            <div [class.success-message]="isSuccess" [class.error-message]="!isSuccess">
              {{statusMessage}}
            </div>
            <div class="redirect-message">
              {{redirectMessage}}
            </div>
          </div>
          <button class="modal-button" (click)="close()">OK</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }

    .modal-overlay.show {
      opacity: 1;
      visibility: visible;
    }

    .modal-card {
      background-color: #fff;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      min-width: 300px;
      max-width: 90%;
      transform: scale(0.9);
      transition: transform 0.3s ease;
    }

    .modal-overlay.show .modal-card {
      transform: scale(1);
    }

    .modal-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      text-align: center;
    }

    .modal-message {
      font-size: 18px;
      font-weight: 500;
      color: #333;
      line-height: 1.4;
    }

    .modal-button {
      padding: 10px 24px;
      border: none;
      border-radius: 6px;
      background-color: #f5a012;
      color: white;
      font-weight: 500;
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .modal-button:hover {
      background-color: #f6d59e;
    }

     .success-text {
      color: #4CAF50;
      font-weight: 600;
    }

    .modal-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      text-align: center;
    }

    .message-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .success-message {
      color: #4CAF50;
      font-weight: 600;
      font-size: 18px;
    }

    .error-message {
      color: #f44336;
      font-weight: 600;
      font-size: 18px;
    }

    .redirect-message {
      color: #333;
      font-size: 16px;
    }

  `]
})
export class ToastComponent {
  // @Input() message: string = '';
  @Input() isSuccess: boolean = true;
  @Output() onClose = new EventEmitter<void>();
  visible: boolean = false;
  statusMessage: string = '';
  redirectMessage: string = '';

  constructor(private router: Router) {}

  show(success: any = true) {
    this.isSuccess = success;
    this.statusMessage = success ? 'Transaction successful!' : 'Transaction failed!';
    this.redirectMessage = 'You are now being redirected to the homepage...';
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
    }, 630_000);
  }

  close() {
    this.visible = false;
    this.router.navigate(['/']);
  }
}
