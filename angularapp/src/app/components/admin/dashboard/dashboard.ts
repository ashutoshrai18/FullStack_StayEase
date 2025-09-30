import { Component } from '@angular/core';
import {Navbar} from '../navbar/navbar';
import {Sidebar} from '../sidebar/sidebar';
import {Home} from '../home/home';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    Navbar,
    Sidebar,
    RouterOutlet
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  standalone: true,
})
export class Dashboard {

}
