import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, RouterModule], // 👈 RouterModule ADDED
  templateUrl: './admin-users.component.html'
})
export class AdminUsersComponent implements OnInit {
  users: any[] = [];

  ngOnInit(): void {
    axios.get('http://localhost:5000/api/admin/users', {
      headers: {
        Authorization: localStorage.getItem('token') || ''
      }
    })
    .then(res => {
      this.users = res.data;
    })
    .catch(err => {
      console.error(err);
    });
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/login';
  }
}
