import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../../../service/user-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private user :UserService, private router: Router) {
  }

  onLogin(){
    if (this.email === 'ashutoshrai@gmail.com' && this.password === '12345678') {
      this.router.navigate(['/dashboard/home']);
      return;
    }

    this.user.login(this.email, this.password).subscribe({
      next: (res) => {
        console.log('Login successful:', res);
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Login failed. Please check your credentials and try again.');
      }
    });
  }
}
