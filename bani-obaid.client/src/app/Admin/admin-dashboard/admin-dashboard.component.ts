import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { HosamService } from '../../Hosam/Services/hosam.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  isSidebarVisible = true; // Sidebar visibility state
  isTabletOrBelow = false; // Determines if the screen is tablet or smaller

  constructor(private hosamService: HosamService, private router: Router) { }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isTabletOrBelow = window.innerWidth <= 992;
    if (this.isTabletOrBelow) {
      this.isSidebarVisible = false; 
    } else {
      this.isSidebarVisible = true; 
    }
  }

  ngOnInit() {
    this.onResize();
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  Logout() {
    this.hosamService.logout();
    this.router.navigate(['/admin']);
  }
}
