import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Grocery_Store';
//NB : No need to unsubscribe because the subscription lasts for the lifetime of our entire application so when the application is closed or the user moves away then it automatically unsubscribes
  constructor(private authService: AuthService, router: Router) {
    authService.user$.subscribe((user) => {
      if (user) {
        let returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl || '/');
      }
    });
  }
}
