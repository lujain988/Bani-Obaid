import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';

@Component({
  selector: 'app-about-municipality',
  templateUrl: './about-municipality.component.html',
  styleUrls: ['./about-municipality.component.css']
})
export class AboutMunicipalityComponent implements OnInit {
  AboutMunicipalityArray: any; 

  constructor(private _ser: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllMunicipalities();
  }

  
  getAllMunicipalities(): void {
    this._ser.getMunicipality().subscribe(
      (data) => {
        this.AboutMunicipalityArray = data;
        console.log(this.AboutMunicipalityArray, 'AboutMunicipalityArray');
      },
      (error) => {
        console.error('Error fetching municipality data:', error);
      }
    );
  }
}
