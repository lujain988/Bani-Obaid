import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlService } from '../URL Service/url.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'] // يجب أن يكون "styleUrls" بصيغة الجمع
})
export class EventDetailsComponent {
  eventDetails: any; // بيانات الفعالية
  formattedDate: string = ''; // التاريخ بصيغة منسقة
  formattedTime: string = ''; // الوقت بصيغة منسقة
  participant = { name: '', phone: '', email: '' }; // بيانات المشارك

  constructor(
    private route: ActivatedRoute, // للحصول على المعرف من المسار
    private eventsService: UrlService // للتعامل مع البيانات
  ) { }

  ngOnInit(): void {
    const eventId = this.route.snapshot.params['id']; // استخراج معرّف الفعالية من الرابط
    this.fetchEventDetails(eventId);
  }

  // جلب تفاصيل الفعالية من الخدمة
  fetchEventDetails(eventId: number): void {
    this.eventsService.getEventDetails(eventId).subscribe(event => {
      this.eventDetails = event;
      this.formatDateAndTime();
    });
  }

  // تنسيق التاريخ والوقت
  formatDateAndTime(): void {
    if (this.eventDetails) {
      const time = this.eventDetails.time; // وقت الفعالية
      const date = new Date(this.eventDetails.eventDate); // تاريخ الفعالية

      // تنسيق الوقت إلى صيغة 12 ساعة باللغة العربية
      this.formattedTime = new Date(`1970-01-01T${time}`).toLocaleTimeString('ar-SA', {
        hour: '2-digit',
        minute: '2-digit'
      });

      // تنسيق التاريخ باللغة العربية
      this.formattedDate = date.toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }


  // تسجيل المشارك في الفعالية
  registerForEvent(): void {
    this.eventsService.registerParticipant(this.eventDetails.id, this.participant).subscribe(response => {
      alert('تم التسجيل بنجاح!');
      // إعادة تعيين بيانات النموذج بعد التسجيل
      this.participant = { name: '', phone: '', email: '' };
    });
  }
}
