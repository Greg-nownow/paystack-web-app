import { Injectable, ComponentRef, createComponent, ApplicationRef, EnvironmentInjector } from '@angular/core';
import { ToastComponent } from '../components/toast/toast.component';
// import { ToastComponent } from '../components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastRef: ComponentRef<ToastComponent> | null = null;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  show(isSuccess: boolean) {
    if (this.toastRef) {
      this.toastRef.destroy();
    }

    this.toastRef = createComponent(ToastComponent, {
      environmentInjector: this.injector
    });

    document.body.appendChild(this.toastRef.location.nativeElement);
    this.appRef.attachView(this.toastRef.hostView);

    this.toastRef.instance.onClose.subscribe(() => {
      if (this.toastRef) {
        this.toastRef.destroy();
        this.toastRef = null;
      }
    });
    this.toastRef.instance.show(isSuccess);
  }

  showSuccessToast(message: string) {
    if (this.toastRef) {
      this.toastRef.destroy();
    }

    this.toastRef = createComponent(ToastComponent, {
      environmentInjector: this.injector
    });

    document.body.appendChild(this.toastRef.location.nativeElement);
    this.appRef.attachView(this.toastRef.hostView);

    this.toastRef.instance.statusMessage = message;
    this.toastRef.instance.isSuccess = true;
    this.toastRef.instance.visible = true;

    this.toastRef.instance.onClose.subscribe(() => {
      if (this.toastRef) {
        this.toastRef.destroy();
        this.toastRef = null;
      }
    });
  }

  showErrorToast(message: string) {
    if (this.toastRef) {
      this.toastRef.destroy();
    }

    this.toastRef = createComponent(ToastComponent, {
      environmentInjector: this.injector
    });

    document.body.appendChild(this.toastRef.location.nativeElement);
    this.appRef.attachView(this.toastRef.hostView);

    this.toastRef.instance.statusMessage = message;
    this.toastRef.instance.isSuccess = false;
    this.toastRef.instance.visible = true;

    this.toastRef.instance.onClose.subscribe(() => {
      if (this.toastRef) {
        this.toastRef.destroy();
        this.toastRef = null;
      }
    });
  }
}
