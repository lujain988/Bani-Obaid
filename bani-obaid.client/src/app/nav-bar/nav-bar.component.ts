import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../Ahmad/Service/service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isLoggedIn: boolean = false;
  isAdminLogin(): boolean {
    return this._router.url.includes('/admin');
  }
  constructor(private _router: Router, private _ser: ServiceService) { }

  SocialIconsArray: any;


  ngOnInit(): void {
    this.getAllSocialIcons();
  }

  getAllSocialIcons(): void {
    this._ser.getSocialIcons().subscribe(
      (data) => {
        this.SocialIconsArray = data;
        console.log(this.SocialIconsArray, 'SocialIconsArray');
      },
      (error) => {
        console.error('Error fetching SocialIcons data:', error);
      }
    );
  }





}
