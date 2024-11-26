import { Component } from '@angular/core';
import { UrlService } from '../URL Service/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrl: './event-management.component.css'
})
export class EventManagementComponent {

  events: any[] = [];
  selectedEvent: any = null; // لتخزين البيانات عند التعديل
  isEditMode: boolean = false; // لمعرفة إذا كانت النافذة للإضافة أو التعديل


  constructor(private urlService: UrlService, private router: Router) { }

  ngOnInit(): void {
    this.getEvents();
  }


  // Fetch all events
  getEvents() {
    this.urlService.getEvents().subscribe(
      (data) => {
        this.events = data;
      },
      (error) => {
        console.error('Error fetching events', error);
      }
    );
  }

  // Add a new event
  addEvent() {
    this.router.navigate(['/adminDashboard/event-form']); // تأكد من وجود صفحة الإضافة
  }

  // Edit an event
  editEvent(id: number) {
    this.router.navigate(['/adminDashboard/event-form', id]); // تأكد من وجود صفحة التعديل
  }

  // Delete an event
  deleteEvent(id: number) {
    if (confirm('هل أنت متأكد أنك تريد حذف هذه الفعالية؟')) {
      this.urlService.deleteEvent(id).subscribe(
        () => {
          alert('تم حذف الفعالية بنجاح.');
          this.getEvents(); // Refresh the events list
        },
        (error) => {
          console.error('Error deleting event', error);
        }
      );
    }
  }

}
