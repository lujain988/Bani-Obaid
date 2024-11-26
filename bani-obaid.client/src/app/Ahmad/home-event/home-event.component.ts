import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-event',
  templateUrl: './home-event.component.html',
  styleUrls: ['./home-event.component.css']
})
export class HomeEventComponent implements OnInit {
  EventArray: any;

  constructor(private _ser: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getEvent();
  }

  getEvent(): void {
    this._ser.getEvents().subscribe(
      (data) => {
        // تعديل التاريخ ليصبح باللغة العربية
        this.EventArray = data.map((event: any) => ({
          ...event,
          formattedDate: this.formatDateToArabic(event.eventDate)
        }));
        console.log(this.EventArray, 'EventArray');
      },
      (error) => {
        console.error('Error fetching Event data:', error);
      }
    );
  }

  // دالة لتنسيق التاريخ باللغة العربية
  formatDateToArabic(date: string): string {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('ar-EG', options).format(new Date(date));
  }
}
