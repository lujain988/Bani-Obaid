import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HosamService } from '../../Hosam/Services/hosam.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private hosamService: HosamService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.isLoading = true;

      const { email, password } = this.loginForm.value;

      try {
        await this.hosamService.login(email, password).toPromise();

        this.isLoading = false;
        this.loginError = '';
        this.router.navigate(['/adminDashboard/home']);
      } catch (error) {
        this.isLoading = false;
        this.loginError = 'Login failed. Please check your credentials.';
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
