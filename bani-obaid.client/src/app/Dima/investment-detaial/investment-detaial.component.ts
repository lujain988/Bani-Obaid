import { Component } from '@angular/core';
import { ServicesService } from '../DimaServices/services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-investment-detaial',
  templateUrl: './investment-detaial.component.html',
  styleUrl: './investment-detaial.component.css'
})
export class InvestmentDetaialComponent {
  investment: any;
 investmentId: any;

  constructor(
    private _ser: ServicesService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.investmentId = +params['id'];
      this.getInvestmentbyId(this.investmentId);
    });
  }

  getInvestmentbyId(id: number): void {
    this._ser.getinvestmentsById(id).subscribe(
      (data) => {
        this.investment = data;
        console.log('Fetched investment data:', this.investment);
      },
      (error) => {
        console.error('Error fetching investment by ID:', error);
      }
    );
  }
  
}

