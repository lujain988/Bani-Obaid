import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'] // Note: 'styleUrls' instead of 'styleUrl'
})
export class AdminDashboardComponent {
  constructor(private router: Router) { }

  isActive(route: string): boolean {
    return this.router.url.startsWith(route);


  }
}
