import { Component } from '@angular/core';

@Component({
  selector: 'app-municipalities',
  templateUrl: './municipalities.component.html',
  styleUrl: './municipalities.component.css'
})
export class MunicipalitiesComponent {

  sections = [
    { name: 'الحصن', info: 'مدينة تاريخية معروفة بمعالمها القديمة وموقعها الاستراتيجي.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrsr5q31aAnvtodxbNjqblLrkTrA9jYVK7zA&s' },
    { name: 'الصريح', info: 'منطقة حديثة تشتهر بالأنشطة التجارية والسكنية.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN31qeRyIIpJr5ke7E5dAoxBjOriz7CVm0gw&s' },
    { name: 'كتم', info: 'قرية ريفية تتميز بجمال الطبيعة والأراضي الزراعية.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrr4oqvdnv9_sEFkBrJm8howfoeEKFtna3O3SNtn4oFcNL6ZDAIjPDZS_p7zh6X8fwWlY&usqp=CAU' },
    { name: 'النعيمة', info: 'تعد بوابة إربد الشرقية وتشتهر بموقعها المميز.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHAs7rUd3LdLEzYCgTsAQYiiNyE4jqI2wEGA&s' },
    { name: 'شطنا', info: 'منطقة جبلية رائعة الجمال تشتهر بالهدوء والمناظر الطبيعية.', image: 'https://www.7iber.com/wp-content/uploads/2023/05/%D8%B3%D9%88%D8%B1-%D8%B4%D8%B7%D9%86%D8%A7-%D8%A7%D9%84%D9%82%D8%AF%D9%8A%D9%85-%D9%88%D8%A7%D8%AB%D8%A7%D8%B1-%D9%85%D8%AD%D9%8A%D8%B7%D8%A9-%D9%85%D8%B7%D9%84%D8%A9-%D8%B9%D9%84%D9%89-%D9%85%D8%B1%D8%B9%D9%89-%D8%A7%D9%84%D9%83%D8%B1%D9%83-1.jpg' },
    { name: 'أيدون', info: 'مدينة مميزة تضم العديد من الخدمات التعليمية والصحية.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbBjiT6j2bTaHwkfIQ_8BvKt_Ejsuqmpi4O-LSLLkrUjl0tLj8CbWSVwBnGdKGVMwYT1E&usqp=CAU' },
  ];
}
