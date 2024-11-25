import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlService } from '../URL Service/url.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent implements OnInit {
  eventForm!: FormGroup;
  isEditMode: boolean = false; // لمعرفة إذا كانت الصفحة في وضع التعديل
  eventId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private urlService: UrlService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // إنشاء النموذج
    this.eventForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      location: ['', [Validators.required]],
      time: ['', [Validators.required]],
      eventDate: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });

    // التحقق من وجود id في الرابط لتحديد وضع الصفحة
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.eventId = +id;
        this.loadEventDetails(this.eventId); // تحميل بيانات الفعالية
      }
    });
  }

  // تحميل بيانات الفعالية عند التعديل
  loadEventDetails(id: number) {
    this.urlService.getEventDetails(id).subscribe(
      (event) => {
        this.eventForm.patchValue({
          title: event.title,
          description: event.description,
          location: event.location,
          time: event.time,
          eventDate: event.eventDate,
          image: event.image,
        });
      },
      (error) => {
        console.error('Error loading event details', error);
      }
    );
  }

  // إرسال النموذج
  onSubmit() {
    if (this.eventForm.invalid) {
      alert('يرجى ملء جميع الحقول المطلوبة.');
      return;
    }

    const eventData = { ...this.eventForm.value }; // نسخ بيانات النموذج
    const rawTime = this.eventForm.get('time')?.value;

    // تحويل الوقت إلى صيغة "HH:mm:ss"
    if (rawTime) {
      const timeParts = rawTime.split(':'); // تقسيم الوقت إلى ساعات ودقائق وثوانٍ
      eventData.time = `${timeParts[0]}:${timeParts[1]}:00`; // إضافة الثواني إذا لم تكن موجودة
    }

    if (this.isEditMode && this.eventId !== null) {
      // تعديل فعالية
      this.urlService.updateEvent(this.eventId, eventData).subscribe(
        () => {
          alert('تم تعديل الفعالية بنجاح.');
          this.router.navigate(['/eventManagement']); // العودة لقائمة الفعاليات
        },
        (error) => {
          console.error('Error updating event', error);
        }
      );
    } else {
      // إضافة فعالية جديدة
      this.urlService.addEvent(eventData).subscribe(
        () => {
          alert('تمت إضافة الفعالية بنجاح.');
          this.router.navigate(['/eventManagement']); // العودة لقائمة الفعاليات
        },
        (error) => {
          console.error('Error adding event', error);
        }
      );
    }
  }

}





/// بدي اشوف شو مال الاضافه///////
// وبدي اعدل الستايل للفورم/////////
// واعمل منجمنت للتسجيلات بالفعاليات
  // اعرضهم كلهم
  // اعرض التسجيلات حسب الفعاليه
  //واحذف التسجيل
