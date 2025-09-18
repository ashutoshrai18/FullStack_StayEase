import { Component } from '@angular/core';
import {Login} from './login/login';

@Component({
  selector: 'app-admin',
  imports: [
    Login
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

}
