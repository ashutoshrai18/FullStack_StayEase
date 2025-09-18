import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  standalone:true,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  // loginData = { email: '', password: '' };
  //
  // onLogin() {
  //   console.log("Login Data:", this.loginData);
  //   alert("Login clicked! (Backend integration pending)");
  // }
}
