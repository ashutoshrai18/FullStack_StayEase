import { Component } from '@angular/core';
        import { CommonModule } from '@angular/common';

        @Component({
          selector: 'app-payment',
          imports: [CommonModule],
          templateUrl: './payment.html',
          styleUrls: ['./payment.css']
        })
        export class Payment {
          transactions = [
            {
              transactionId: 'T1001',
              bookingId: 'B001',
              name: 'John Doe',
              date: new Date(),
              amount: 1200,
              method: 'Credit Card',
              status: 'Success'
            },
            {
              transactionId: 'T1002',
              bookingId: 'B002',
              name: 'Jane Smith',
              date: new Date(),
              amount: 800,
              method: 'UPI',
              status: 'Pending'
            }
            // Add more transactions as needed
          ];
        }
