import { Component, OnInit } from '@angular/core';
import { UrlService } from '../URL Service/url.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {

  events: any[] = [];

  constructor(private urlService: UrlService) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.urlService.getEvents().subscribe(
      (response) => {
        this.events = response;
      },
      (error) => {
        console.error('Error loading events:', error);
      }
    );
  }

  formatTime(time: string | undefined): string {
    if (!time) return 'N/A';
    try {
      const date = new Date(`1970-01-01T${time}Z`);
      const hours = date.getUTCHours();
      const minutes = date.getUTCMinutes();
      const period = hours < 12 ? 'صباحا' : 'مساءا';
      return `${hours % 12 || 12}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
    } catch (error) {
      console.error('Invalid time format:', time);
      return 'N/A';
    }
  }

  formatDate(eventDate: string | undefined): string {
    if (!eventDate) return 'N/A';
    try {
      return new Intl.DateTimeFormat('ar-EG', { dateStyle: 'long' }).format(new Date(eventDate));
    } catch (error) {
      console.error('Invalid date format:', eventDate);
      return 'N/A';
    }
  }
}

