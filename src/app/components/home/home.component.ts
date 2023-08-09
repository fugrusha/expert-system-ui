import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MainToolbarComponent } from '../ui/main-toolbar/main-toolbar.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MainToolbarComponent],
})
export class HomeComponent {

  constructor(private router: Router) { }

  navigateToSurvey() {
    this.router.navigate(['/survey']);
  }

  navigateToRules() {
    this.router.navigate(['/rules']);
  }
}
