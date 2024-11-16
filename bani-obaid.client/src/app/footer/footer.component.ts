import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(private _router: Router) { }
  isLoggedIn: boolean = false;
  isAdminLogin(): boolean {
    return this._router.url.includes('/admin');
  }
}
