import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../../model/user/user-model';

declare const bootstrap: any;

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  user: UserModel | null = null;
  userName: string | null = null;
  userId: number | null = null;
  dropdownOpen = false;

  constructor(private router: Router) {}

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        this.user = JSON.parse(userStr);
        this.userName = this.user?.name ?? 'Profile';
        this.userId = typeof this.user?.userId === 'number'
          ? this.user.userId
          : Number(this.user?.userId) || null;
      } else {
        this.userName = 'Profile';
      }
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  goToBookings() {
    this.router.navigate(['/my-bookings']);
    this.dropdownOpen = false;
  }

  openAccountModal() {
    const modal = new bootstrap.Modal(document.getElementById('accountModal'));
    modal.show();
    this.dropdownOpen = false;
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.clear();
    }
    this.router.navigate(['/login']);
    this.dropdownOpen = false;
  }
}
