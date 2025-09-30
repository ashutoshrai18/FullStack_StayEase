import { Component, OnInit } from '@angular/core';
    import { Router, ActivatedRoute } from '@angular/router';
    import { CommonModule } from '@angular/common';
    import { FormsModule } from '@angular/forms';
    import { Navbar } from '../navbar/navbar';
    import { SearchBox } from '../search-box/search-box';
    import { Footer } from '../footer/footer';

    @Component({
      selector: 'app-home',
      templateUrl: './home.html',
      styleUrls: ['./home.css'],
      imports: [CommonModule, FormsModule, Navbar, SearchBox, Footer],
      standalone: true
    })
    export class HomeComponent implements OnInit {
      constructor(private router: Router, private route: ActivatedRoute) {}

      ngOnInit() {
        this.route.fragment.subscribe((fragment: string | null) => {
          if (fragment) {
            setTimeout(() => {
              const el = document.getElementById(fragment);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }, 0);
          }
        });
      }

      onSearch() {
        this.router.navigate(['/hotel-lists']);
      }
    }
