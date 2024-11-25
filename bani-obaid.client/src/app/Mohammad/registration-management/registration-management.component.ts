import { Component, OnInit } from '@angular/core';
import { UrlService } from '../URL Service/url.service';

@Component({
  selector: 'app-registration-management',
  templateUrl: './registration-management.component.html',
  styleUrl: './registration-management.component.css'
})
export class RegistrationManagementComponent implements OnInit {
  registrations: any[] = [];
  eventId: any | null = null;
  events: any[] = [];


  constructor(private registrationService: UrlService) { }

  ngOnInit(): void {
    this.loadAllRegistrations();
    this.loadEventNames();
  }

  loadEventNames(): void {
    this.registrationService.getEventNames().subscribe((data) => {
      this.events = data;
    });
  }


  loadAllRegistrations(): void {
    this.registrationService.getAllRegistrations().subscribe((data) => {
      this.registrations = data;
    });
  }

  loadRegistrationsByEvent(eventId: number): void {
    this.registrationService.getRegistrationsByEvent(eventId).subscribe((data) => {
      this.registrations = data;
    });
  }


  deleteRegistration(id: number): void {
    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.registrationService.deleteRegistration(id).subscribe(() => {
        alert('تم حذف السجل بنجاح.');
        this.loadAllRegistrations();
      });
    }
  }
}
