import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization-structure',
  templateUrl: './organization-structure.component.html',
  styleUrls: ['./organization-structure.component.css']
})
export class OrganizationStructureComponent implements OnInit {
  Structure: any; // بدلًا من StructureArray لتخزين العنصر الأول فقط

  constructor(private _ser: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getStructure();
  }

  getStructure() {
    this._ser.getStructure().subscribe(
      (data) => {
        if (Array.isArray(data) && data.length > 0) {
          this.Structure = data[0]; // استخراج العنصر الأول من المصفوفة
        }
        console.log(this.Structure, "Structure");
      },
      (error) => {
        console.error("Error fetching structure:", error);
      }
    );
  }
}
