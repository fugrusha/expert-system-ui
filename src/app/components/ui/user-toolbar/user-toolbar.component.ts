import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-toolbar',
  templateUrl: './user-toolbar.component.html',
  styleUrls: ['./user-toolbar.component.css'],
  standalone: true,
  imports:[MatToolbarModule, MatButtonModule, MatIconModule]
})
export class UserToolbarComponent {

  title: string = 'Помічник з підбору житла'

  constructor(private router: Router) { }

  navigateToHomePage() {
    this.router.navigate(['/']);
  }
}
