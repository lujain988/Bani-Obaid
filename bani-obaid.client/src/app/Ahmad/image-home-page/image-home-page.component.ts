import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image-home-page',
  templateUrl: './image-home-page.component.html',
  styleUrls: ['./image-home-page.component.css']
})
export class ImageHomePageComponent implements OnInit {

  HomeImageArray: any;
  currentTime: string = ''; 

  constructor(private _ser: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllHomeImages();
    this.updateTime(); 
  }

  getAllHomeImages(): void {
    this._ser.getHomeImage().subscribe(
      (data) => {
        this.HomeImageArray = data;
        console.log(this.HomeImageArray, 'HomeImageArray');
      },
      (error) => {
        console.error('Error fetching municipality data:', error);
      }
    );
  }

  updateTime(): void {
    setInterval(() => {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    }, 1000); 
  }
}
