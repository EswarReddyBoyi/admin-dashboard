import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-dashboard.component.html'
})
export class UserDashboardComponent {

  logout(): void {
    localStorage.clear();
    window.location.href = '/login';
  }
}
