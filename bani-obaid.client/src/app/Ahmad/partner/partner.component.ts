import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css'],
})
export class PartnerComponent implements OnInit {
  partnersArray: any[] = []; // تعريف كـ array مع ضمان أن تكون البيانات موجودة

  // خيارات الـ Carousel
  carouselOptions = {
    items: 3,
    margin: 30,
    smartSpeed: 700,
    loop: true,
    autoplay: true,
    autoplayTimeout: 6000,
    nav: false,
    dots: false,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      992: { items: 3 },
    },
  };

  constructor(private _ser: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllpartners();
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
