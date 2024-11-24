import { Component } from '@angular/core';
import { ServiceService } from '../Service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-municipality-member',
  templateUrl: './municipality-member.component.html',
  styleUrl: './municipality-member.component.css'
})
export class MunicipalityMemberComponent {

  MemberArray: any;

  constructor(private _ser: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllMembers();
  }

  CategoryArray: any
  getAllMembers() {
    this._ser.getMember().subscribe((data) => {
      this.MemberArray = data
      console.log(this.MemberArray, "this.MemberArray")
    })
  }

}
