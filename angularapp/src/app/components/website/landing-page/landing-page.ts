import { Component } from '@angular/core';
import {HomeComponent} from '../home/home';
import {Footer} from '../footer/footer';
import {Navbar} from '../navbar/navbar';

@Component({
  selector: 'app-landing-page',
  imports: [
    HomeComponent,
    Footer,
    Navbar
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css'
})
export class LandingPage {

}
