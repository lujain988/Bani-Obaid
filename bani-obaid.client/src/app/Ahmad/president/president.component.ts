import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-president',
  templateUrl: './president.component.html',
  styleUrls: ['./president.component.css']
})
export class PresidentComponent implements OnInit {
  PresidentArray: any = null; 
  errorMessage: string | null = null; 

  constructor(private _ser: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllPresident();
  }

  getAllPresident(): void {
    this._ser.getPresident().subscribe(
      (data) => {
        this.PresidentArray = data.length > 0 ? data[0] : null; 
        this.errorMessage = null;
        console.log(this.PresidentArray, 'PresidentArray');
      },
      (error) => {
        console.error('Error fetching president data:', error);
        this.errorMessage = 'حدث خطأ أثناء تحميل البيانات. الرجاء المحاولة لاحقًا.';
      }
    );
  }
}
