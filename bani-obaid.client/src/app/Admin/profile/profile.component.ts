import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profileData = {
    email: '',
    oldPassword: '',
    password: '',
    confirmPassword: ''
  };

  private apiUrl = 'https://localhost:7243/api/Auth';

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit(): void {
    if (
      !this.profileData.email ||
      !this.profileData.oldPassword ||
      !this.profileData.password ||
      !this.profileData.confirmPassword
    ) {
      alert('يرجى ملء الحقول المطلوبة.');
      return;
    }

    if (this.profileData.password !== this.profileData.confirmPassword) {
      alert('كلمة المرور الجديدة وتأكيد كلمة المرور غير متطابقتين.');
      return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append('email', this.profileData.email);
    formData.append('oldPassword', this.profileData.oldPassword);
    formData.append('password', this.profileData.password);
    debugger;
    this.http.put(this.apiUrl, formData).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'تم التحديث!',
          text: 'تم تحديث كلمة المرور بنجاح.'
        });
        this.profileData = {
          email: '',
          oldPassword: '',
          password: '',
          confirmPassword: ''
        };
        this.router.navigate(['/profile']);
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        Swal.fire({
          icon: 'error',
          title: 'حدث خطأ',
          text: 'فشل تحديث كلمة المرور. حاول مرة أخرى.'
        });
      }
    });
  }
}




