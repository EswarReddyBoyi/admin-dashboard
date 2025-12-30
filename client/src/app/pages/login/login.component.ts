import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import axios from 'axios';

declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements AfterViewInit {
  email = '';
  password = '';
  message = '';

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.waitForGoogle();
  }

  waitForGoogle(): void {
    if (window.google && window.google.accounts) {
      this.initGoogleLogin();
    } else {
      setTimeout(() => this.waitForGoogle(), 100);
    }
  }

  initGoogleLogin(): void {
    window.google.accounts.id.initialize({
      client_id: '287608524888-v92ni6ur6uguftrdct8e1q9r9hnsbr2t.apps.googleusercontent.com',
      callback: (response: any) => this.handleGoogleLogin(response)
    });

    window.google.accounts.id.renderButton(
      document.getElementById('googleBtn'),
      { theme: 'outline', size: 'large' }
    );
  }

  handleGoogleLogin(response: any): void {
    axios.post('http://localhost:5000/api/auth/google', {
      token: response.credential
    })
    .then(res => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      if (res.data.role === 'admin') {
        this.router.navigate(['/admin-dashboard']);
      } else {
        this.router.navigate(['/user-dashboard']);
      }
    })
    .catch(() => {
      this.message = 'Google login failed';
    });
  }

  login(): void {
    axios.post('http://localhost:5000/api/auth/login', {
      email: this.email,
      password: this.password
    })
    .then(res => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);

      if (res.data.role === 'admin') {
        this.router.navigate(['/admin-dashboard']);
      } else {
        this.router.navigate(['/user-dashboard']);
      }
    })
    .catch((err: any) => {
      this.message = err?.response?.data?.message || 'Login failed';
    });
  }
}
