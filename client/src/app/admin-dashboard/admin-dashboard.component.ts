import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import axios from 'axios';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent {

  ngAfterViewInit(): void {
    new Chart('adminChart', {
      type: 'bar',
      data: {
        labels: ['Users', 'Admins', 'Sales', 'Active Users'],
        datasets: [{
          label: 'Admin Analytics',
          data: [120, 5, 300, 90],
          backgroundColor: ['#1976d2', '#388e3c', '#f57c00', '#d32f2f']
        }]
      },
       options: {
    responsive: true,
    maintainAspectRatio: false,  // 👈 IMPORTANT
    plugins: {
      legend: {
        labels: {
          font: {
            size: 14
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: { size: 13 }
        }
      },
      y: {
        ticks: {
          font: { size: 13 }
        }
      }
    }
  }
    });
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/login';
  }
}


axios.get('http://localhost:5000/api/admin/analytics', {
  headers: {
    Authorization: localStorage.getItem('token')
  }
}).then(res => {
  const data = res.data;

  new Chart('adminChart', {
    type: 'bar',
    data: {
      labels: ['Total Users', 'Admins', 'Users', 'Active'],
      datasets: [{
        label: 'System Analytics',
        data: [
          data.totalUsers,
          data.admins,
          data.users,
          data.activeUsers
        ]
      }]
    }
  });
});
