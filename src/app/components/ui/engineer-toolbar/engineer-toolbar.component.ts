import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-engineer-toolbar',
  templateUrl: './engineer-toolbar.component.html',
  styleUrls: ['./engineer-toolbar.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule]
})
export class EngineerToolbarComponent {

  title: string = 'Експертна система з підбору житла у м. Дніпро'

  constructor(private router: Router) { }

  navigateToHomePage() {
    this.router.navigate(['/']);
  }

  navigateToQuestions() {
    this.router.navigate(['/questions']);
  }

  navigateToRules() {
    this.router.navigate(['/rules']);
  }
}
