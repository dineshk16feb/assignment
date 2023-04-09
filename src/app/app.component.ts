import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.gaurd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  subscription: Subscription;

  constructor(private router: Router, private authService: AuthService, private authGuard: AuthGuard) {
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (['/login', '/registration'].includes(event.url)) {
          document.body.classList.add('auth-background');
        } else {
          document.body.classList.remove('auth-background');
        }
        // if (!this.router.navigated && this.authService.isLoggedIn) {
        //   console.log('asas')
        // }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
