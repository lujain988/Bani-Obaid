import { Component } from '@angular/core';
import { ServiceService } from '../../Ahmad/Service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-about-municipality',
  templateUrl: './admin-about-municipality.component.html',
  styleUrl: './admin-about-municipality.component.css'
})
export class AdminAboutMunicipalityComponent {
  ngOnInit() {
    this.getAboutMunicipality()
  }

  constructor(private _ser: ServiceService, private router: Router) {

  }

  AboutArray: any
  getAboutMunicipality() {
    this._ser.getMunicipality().subscribe((data) => {
      if (data && data.length > 0) {
        this.AboutArray = data[0]; // احصل على العنصر الأول فقط
        console.log(this.AboutArray, "this.AboutArray");
      } else {
        console.error("لا توجد بيانات");
      }
    });
  }


}
