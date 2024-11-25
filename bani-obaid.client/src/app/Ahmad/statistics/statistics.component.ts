import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  statistics = [
    { count: 32, text: 'عدد الزوار', currentCount: 0 },
    { count: 5, text: 'عدد الفعاليات', currentCount: 0 },
    { count: 45, text: 'عدد الخدمات الالكترونية', currentCount: 0 },
    { count: 4, text: 'عدد المشاريع', currentCount: 0 },
  ];

  ngOnInit(): void {
    this.startCounting();
  }

  startCounting(): void {
    this.statistics.forEach((stat) => {
      const increment = Math.ceil(stat.count / 50); // نسبة الزيادة لكل مرة
      const interval = setInterval(() => {
        if (stat.currentCount < stat.count) {
          stat.currentCount += increment;
          if (stat.currentCount > stat.count) {
            stat.currentCount = stat.count; // التأكد من عدم تجاوز القيمة النهائية
          }
        } else {
          clearInterval(interval);
        }
      }, 50); // سرعة التحديث (50ms)
    });
  }
}
