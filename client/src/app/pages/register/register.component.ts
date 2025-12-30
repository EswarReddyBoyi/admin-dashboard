import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule], // 👈 IMPORTANT FIX
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  role = 'user';   // 👈 ADD THIS
  message = '';

  constructor(private router: Router) {}

  register(): void {
    axios.post('http://localhost:5000/api/auth/register', {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role          // 👈 SEND ROLE
    })
    .then(() => {
      this.router.navigate(['/login']);
    })
    .catch((err: any) => {
      this.message = err?.response?.data?.message || 'Registration failed';
    });
  }
}
