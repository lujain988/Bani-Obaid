import { Component } from '@angular/core';
import { ServiceService } from '../../Ahmad/Service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminorganization-structure',
  templateUrl: './adminorganization-structure.component.html',
  styleUrl: './adminorganization-structure.component.css'
})
export class AdminorganizationStructureComponent {
  ngOnInit() {
    this.getAllStructure()
  }

  constructor(private _ser: ServiceService, private router: Router) {
  }

  StructureArray: any
  getAllStructure() {
    this._ser.getStructure().subscribe((data) => {
      this.StructureArray = data
      console.log(this.StructureArray, "this.StructureArray")
    })
  }

}
