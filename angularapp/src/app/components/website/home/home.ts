// src/app/components/website/home/home.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Navbar} from '../navbar/navbar';
import {SearchBox} from '../search-box/search-box';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  imports: [CommonModule, FormsModule, Navbar, SearchBox]
})
export class HomeComponent {
  constructor(private router: Router) {}

  onSearch() {
    this.router.navigate(['/hotel-lists']);
  }
}
