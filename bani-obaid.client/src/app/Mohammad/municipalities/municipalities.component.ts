import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-municipalities',
  templateUrl: './municipalities.component.html',
  styleUrls: ['./municipalities.component.css'],
})
export class MunicipalitiesComponent {
  constructor(private router: Router) { }

  sections = [
    {
      id: 1,
      name: 'الحصن',
      totalArea: 56,
      organizedArea: 20,
      unorganizedArea: 36,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrsr5q31aAnvtodxbNjqblLrkTrA9jYVK7zA&s',
    },
    {
      id: 2,
      name: 'الصريح',
      totalArea: 28.5,
      organizedArea: 12,
      unorganizedArea: 16.5,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN31qeRyIIpJr5ke7E5dAoxBjOriz7CVm0gw&s',
    },
    {
      id: 3,
      name: 'كتم',
      totalArea: 13,
      organizedArea: 2.5,
      unorganizedArea: 10.5,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrr4oqvdnv9_sEFkBrJm8howfoeEKFtna3O3SNtn4oFcNL6ZDAIjPDZS_p7zh6X8fwWlY&usqp=CAU',
    },
    {
      id: 4,
      name: 'النعيمة',
      totalArea: 85,
      organizedArea: 16,
      unorganizedArea: 69,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHAs7rUd3LdLEzYCgTsAQYiiNyE4jqI2wEGA&s',
    },
    {
      id: 5,
      name: 'شطنا',
      totalArea: 4,
      organizedArea: 1,
      unorganizedArea: 3,
      image: 'https://www.7iber.com/wp-content/uploads/2023/05/%D8%B3%D9%88%D8%B1-%D8%B4%D8%B7%D9%86%D8%A7-%D8%A7%D9%84%D9%82%D8%AF%D9%8A%D9%85-%D9%88%D8%A7%D8%AB%D8%A7%D8%B1-%D9%85%D8%AD%D9%8A%D8%B7%D8%A9-%D9%85%D8%B7%D9%84%D8%A9-%D8%B9%D9%84%D9%89-%D9%85%D8%B1%D8%B9%D9%89-%D8%A7%D9%84%D9%83%D8%B1%D9%83-1.jpg',
    },
    {
      id: 6,
      name: 'أيدون',
      totalArea: 20,
      organizedArea: 14,
      unorganizedArea: 6,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbBjiT6j2bTaHwkfIQ_8BvKt_Ejsuqmpi4O-LSLLkrUjl0tLj8CbWSVwBnGdKGVMwYT1E&usqp=CAU',
    },
  ];

  viewMore(id: number) {
    this.router.navigate(['/area-details', id]); // تمرير معرف المنطقة
  }

}
