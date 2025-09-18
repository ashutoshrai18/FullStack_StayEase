import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Login} from './components/admin/login/login';
import {Booking} from './components/admin/booking/booking';
import {Hotel} from './components/admin/hotel/hotel';
import {Room} from './components/admin/room/room';
import {Payment} from './components/admin/payment/payment';
import {Error} from './components/error/error';
import {Signup} from './components/admin/signup/signup';
import {Navbar} from './components/admin/navbar/navbar';
import {Sidebar} from './components/admin/sidebar/sidebar';
import {Dashboard} from './components/admin/dashboard/dashboard';
import {Home} from './components/admin/home/home';
import {UserComponent} from './components/admin/user/user';
import {Test} from './test/test';
import {LandingPage} from './components/website/landing-page/landing-page';
import {HomeComponent} from './components/website/home/home';
import {LoginComponent} from './components/website/login/login';
import {HotelListsComponent} from './components/website/hotel-lists/hotel-lists';
import {HotelDetailsComponent} from './components/website/hotel-details/hotel-details';

export const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'login', component: Login},
  {path: 'signup', component: Signup},
  {path: 'navbar', component: Navbar},
  {path: 'sidebar', component: Sidebar},
  {path: 'website/login', component: LoginComponent},
  {path: 'landing', component: LandingPage},
  {path: 'hotel-lists', component: HotelListsComponent},
  {path: 'admin/login', component: Login},
  {path: 'hotel-details', component: HotelDetailsComponent},

  {
    path: 'dashboard',
    component: Dashboard,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: Home},
      {path: 'booking', component: Booking},
      {path: 'hotel', component: Hotel},
      {path: 'room', component: Room},
      {path: 'payment', component: Payment},
      {path: 'user', component: UserComponent},
    ]
  },
  {path: 'about', component: HomeComponent},   // Use LandingPage for About
  {path: 'contact', component: HomeComponent}, // Use LandingPage for Contact
  {path: '**', component: Error}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
