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

    const formData = new FormData();
    formData.append('title', this.eventForm.get('title')?.value);
    formData.append('description', this.eventForm.get('description')?.value);
    formData.append('location', this.eventForm.get('location')?.value);
    formData.append('time', this.eventForm.get('time')?.value);
    formData.append('eventDate', this.eventForm.get('eventDate')?.value);

    // إضافة الصورة إلى FormData
    const fileInput: HTMLInputElement = document.querySelector('#image')!;
    const file = fileInput.files ? fileInput.files[0] : null;
    if (file) {
      formData.append('image', file);
    }

    if (this.isEditMode && this.eventId !== null) {
      // تعديل فعالية
      this.urlService.updateEvent(this.eventId, formData).subscribe(
        () => {
          alert('تم تعديل الفعالية بنجاح.');
          this.router.navigate(['/adminDashboard/eventManagement']);
        },
        (error) => {
          console.error('Error updating event', error);
        }
      );
    } else {
      // إضافة فعالية جديدة
      this.urlService.addEvent(formData).subscribe(
        () => {
          alert('تمت إضافة الفعالية بنجاح.');
          this.router.navigate(['/adminDashboard/eventManagement']);
        },
        (error) => {
          console.error('Error adding event', error);
        }
      );
    }
  }

}




