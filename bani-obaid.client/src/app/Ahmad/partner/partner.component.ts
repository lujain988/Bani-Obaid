import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ServiceService } from '../Service/service.service';
import { Router } from '@angular/router';
declare var $: any; // لتفعيل مكتبة jQuery

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css'],
})
export class PartnerComponent implements OnInit, AfterViewInit {
  partnersArray: any[] = [];

  constructor(private _ser: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllpartners();
  }

  ngAfterViewInit(): void {
    // Initialize Owl Carousel after the view is ready and data is loaded
    setTimeout(() => {
      $('#partnerCarousel').owlCarousel({
        items: 3, // عدد العناصر المعروضة
        margin: 30, // المسافة بين العناصر
        smartSpeed: 700, // سرعة التنقل بين العناصر
        loop: true, // التكرار عند نهاية العناصر
        autoplay: true, // التشغيل التلقائي
        autoplayTimeout: 6000, // الوقت بين كل عرض (6 ثوانٍ)
        nav: false, // تعطيل الأسهم
        dots: false, // تعطيل النقاط
      });
    }, 1000); // تأخير بسيط لضمان تحميل البيانات
  }

  getAllpartners(): void {
    this._ser.getPartner().subscribe(
      (data) => {
        this.partnersArray = data; // تحديث الـ partnersArray من الخادم
        console.log(this.partnersArray, 'partnersArray');
      },
      (error) => {
        console.error('Error fetching partners data:', error);
      }
    );
  }
}
