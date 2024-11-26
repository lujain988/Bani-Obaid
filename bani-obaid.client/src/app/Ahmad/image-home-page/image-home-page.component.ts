import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Service/service.service';

@Component({
  selector: 'app-image-home-page',
  templateUrl: './image-home-page.component.html',
  styleUrls: ['./image-home-page.component.css']
})
export class ImageHomePageComponent implements OnInit {

  HomeImageArray: any = [];
  currentTime: string = '';

  constructor(private _ser: ServiceService) { }

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
        console.error('Error fetching home images:', error);
      }
    );
  }

  updateTime(): void {
    setInterval(() => {
      const now = new Date();
      // استخراج الوقت الحالي بتنسيق 12 ساعة
      const formattedTime = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true // يعرض الوقت بتنسيق 12 ساعة
      });

      // استبدال AM و PM بصباحاً ومساءً
      this.currentTime = formattedTime.replace('AM', 'صباحًا').replace('PM', 'مساءً');
    }, 1000); // يتم التحديث كل ثانية
  }


}
