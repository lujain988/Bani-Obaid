import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor( private _router: Router) { }
  isLoggedIn: boolean = false;
  isAdminLogin(): boolean {
    return this._router.url.includes('/admin');
  }
}
