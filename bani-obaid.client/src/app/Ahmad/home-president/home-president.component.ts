import { Component } from '@angular/core';
import { ServiceService } from '../Service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-president',
  templateUrl: './home-president.component.html',
  styleUrls: ['./home-president.component.css']
})
export class HomePresidentComponent {
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

  getFormattedSpeech(speech: string): string {
    const words = speech.split(' ');
    if (words.length > 80) {
      const first80Words = words.slice(0, 80).join(' ');
      const nextWord = words[80].slice(0, 2); // الحرفان الأولان من الكلمة 81
      return `${first80Words} ${nextWord}...`;
    }
    return speech; // إذا كانت أقل من 80 كلمة
  }
}
