import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { UserService } from '../../../service/user-service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    FormsModule
  ],
  standalone: true,
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  name: string = '';
  email: string = '';
  phoneNumber: string = '';
  password: string = '';
  error: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    if (this.phoneNumber.length > 10 ) {
      this.error = 'Phone number should not exceed 10 digits.';
      alert(this.error);
      return;
    }else if (this.phoneNumber.length < 10 ) {
      this.error = 'Phone number should not less than 10 digits.';
      alert(this.error);
      return;
    }
    const user = {
      name: this.name,
      email: this.email,
      phoneNumber: this.phoneNumber,
      password: this.password
    };
    this.userService.createUser(user).subscribe({
      next: () => {
        this.error = '';
        this.router.navigate(['/login']);
      },
      error: err => {
        if (err.status === 409) {
          this.error = 'Email already exists.';
        } else if (err.status === 500) {
          this.error = 'Server error. Please try again later.';
        } else {
          this.error = 'Registration failed. Please try again.';
        }
        alert(this.error);
        console.error('Error during registration:', err);
      }
    });
  }
  // onSubmit() {
  //   const user = {
  //     name: this.name,
  //     email: this.email,
  //     phoneNumber: this.phoneNumber,
  //     password: this.password
  //   };
  //   this.userService.createUser(user).subscribe({
  //     next: () => {
  //       this.error = '';
  //       this.router.navigate(['/login']);
  //     },
  //     error: err => {
  //       if (err.status === 409) {
  //         this.error = 'Email already exists.';
  //       } else if (err.status === 500) {
  //         this.error = 'Server error. Please try again later.';
  //       } else {
  //         this.error = 'Registration failed. Please try again.';
  //       }
  //       alert(this.error);
  //       console.error('Error during registration:', err);
  //     }
  //   });
  // }
}
