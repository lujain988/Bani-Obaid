import { Component } from '@angular/core';

@Component({
  selector: 'app-e-service',
  templateUrl: './e-service.component.html',
  styleUrl: './e-service.component.css'
})
export class EServiceComponent {

  services = [
    {
      title: 'مخالفات السير',
      icon: 'icon-bus',
      externalLink: 'https://www.ammancity.gov.jo/ar/eservices/login.aspx',
      detailsLink: 'driving-license.html'
    },
    {
      title: 'طلب نقل ملكية',
      icon: 'icon-parthenon',
      internalLink: '/OwnershipTransfer',
      detailsLink: 'department-details.html'
    },
    {
      title: 'ضريبة الابنية و الاراضي',
      icon: 'icon-tuscany',
      externalLink: 'https://ptp.mof.gov.jo/index3.aspx',
      detailsLink: 'department-details.html'
    }
  ];

  openExternalLink(url: string): void {
    window.open(url, '_blank');
  }
}


