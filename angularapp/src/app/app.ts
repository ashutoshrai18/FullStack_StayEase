import {Component, NgModule, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Admin} from './components/admin/admin';
import { RouterModule } from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app.routes';
import {Dashboard} from './components/admin/dashboard/dashboard';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet,Admin],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('StayEase');
}



