import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showFooter = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.url;
        // Oculta el footer en las rutas que contienen '/auth'
        if (currentUrl.includes('/auth')) {
          this.showFooter = false;
        } else {
          this.showFooter = true;
        }
      }
    });
  }
}
