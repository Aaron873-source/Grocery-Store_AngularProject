import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Grocery_Store';
  //NB : No need to unsubscribe because the subscription lasts for the lifetime of our entire application so when the application is closed or the user moves away then it automatically unsubscribes
  constructor(
    private userService: UserService,
    private authService: AuthService,
    router: Router
  ) {
    authService.user$.subscribe((user) => {
      if (user) {
        // Saving the user to the database after the user is logged in
        userService
          .save(user)
          .then(() => {
            // Redirect the user to the returnUrl only after successful save
            let returnUrl = localStorage.getItem('returnUrl');
            if (returnUrl) {
              localStorage.removeItem('returnUrl');
              router.navigateByUrl(returnUrl);
            }
          })
          .catch((error) => console.error('Error in app component:', error));
      }
    });
  }
}
