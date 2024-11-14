import { Component } from '@angular/core';
import { UrlService } from '../URL Service/url.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ownership-transfer',
  templateUrl: './ownership-transfer.component.html',
  styleUrls: ['./ownership-transfer.component.css']
})
export class OwnershipTransferComponent {
  ownershipForm: FormGroup;

  constructor(private fb: FormBuilder, private urlService: UrlService, private router: Router) {
    this.ownershipForm = this.fb.group({
      landlordPhone: ['', Validators.required],
      newOwnerName: ['', Validators.required],
      newOwnerPhone: ['', Validators.required],
      nationalId: ['', Validators.required],
      propertyNumber: ['', Validators.required],
      municipalityName: ['', Validators.required],
      basin: ['', Validators.required],
      district: ['', Validators.required],
      landNumber: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.ownershipForm.valid) {
      const formData = this.ownershipForm.value;
      this.urlService.addOwnershipTransfer(formData).subscribe(
        response => {
          alert('تم ارسال بيانات نقل الملكية بنجاح.'); // Show success message
          this.router.navigate(['/EService']);        },
        error => {
          console.error('Error submitting ownership transfer', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
