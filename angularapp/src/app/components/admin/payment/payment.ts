import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {PaymentService} from '../../../service/payment-service';
import {Payment} from '../../../model/payment/payment-model';
import {filter} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';
import {UserModel} from '../../../model/user/user-model';
import {BookingModel} from '../../../model/booking/booking-model';

declare var bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-payment',
  templateUrl: './payment.html',
  styleUrls: ['./payment.css'],
  imports: [CommonModule, FormsModule]
})
export class PaymentComponent implements OnInit {
  payments: Payment[] = [];
  newPayment: Payment = {
    amount: 0,
    status: '',
    user: {} as UserModel,
    booking: {} as BookingModel,
    paymentMethod: '',
    paymentDate: ''
  };
  editingIndex: number | null = null;
  isLoading: boolean = false;

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url === '/dashboard/payments') {
          this.loadPayments();
        }
      });
    this.loadPayments();
  }

  loadPayments(): void {
    this.isLoading = true;
    this.paymentService.getAllPayment().subscribe((payments: Payment[]) => {
      this.payments = payments;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  // addPayment(): void {
  //   if (this.editingIndex !== null) {
  //     const paymentId = this.payments[this.editingIndex].paymentId!;
  //     this.paymentService.updatePayment(paymentId, this.newPayment).subscribe((updated: Payment) => {
  //       this.payments[this.editingIndex!] = updated;
  //       this.editingIndex = null;
  //       this.resetNewPayment();
  //       this.closeModal();
  //     });
  //   } else {
  //     this.paymentService.createPayment(this.newPayment).subscribe((created: Payment) => {
  //       this.payments.push(created);
  //       this.resetNewPayment();
  //       this.closeModal();
  //     });
  //   }
  // }


  closeModal(): void {
    const modal = bootstrap.Modal.getInstance(document.getElementById('addPaymentModal'));
    if (modal) modal.hide();
  }


}
