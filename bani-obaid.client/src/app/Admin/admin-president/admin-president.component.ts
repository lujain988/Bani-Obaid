import { Component } from '@angular/core';
import { ServiceService } from '../../Ahmad/Service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-president',
  templateUrl: './admin-president.component.html',
  styleUrl: './admin-president.component.css'
})
export class AdminPresidentComponent {
  ngOnInit() {
    this.getAllPresident()
  }

  constructor(private _ser: ServiceService, private router: Router) {
  }

  PresidentArray: any
  getAllPresident() {
    this._ser.getPresident().subscribe((data) => {
      this.PresidentArray = data
      console.log(this.PresidentArray, "this.PresidentArray")
    })
  }

}
