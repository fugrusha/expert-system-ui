import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { UserType } from 'src/app/models/enum/userType';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-seller-toolbar',
  templateUrl: './seller-toolbar.component.html',
  styleUrls: ['./seller-toolbar.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule]
})
export class SellerToolbarComponent {

  title: string = 'Нерухомість.UA'

  constructor(
    private _router: Router,
    private _localStorageService: LocalStorageService,
    private _authService: AuthService
  ) { }

  isLoggedIn(): boolean {
    return this._localStorageService.getUserId() !== null
  }

  getUserType(): UserType | null {
    return this._localStorageService.getUserType()
  }

  navigateToHomePage() {
    this._router.navigate(['/main']);
  }

  navigateToMyProfile() {
    this._router.navigate(['/profile']);
  }

  navigateToSellerProperty() {
    this._router.navigate(['/seller-property']);
  }

  navigateToFavorites() {
    this._router.navigate(['/favorites']);
  }

  navigateToApplications() {
    this._router.navigate(['/buyer-requests']);
  }

  survey() {
    this._router.navigate(['/survey']);
  }

  logout() {
    this._authService.logout();
  }

  login() {
    this._router.navigate(['/login']);
  }
}
