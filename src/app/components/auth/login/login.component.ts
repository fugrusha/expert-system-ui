import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserType } from 'src/app/models/enum/userType';
import { AuthService } from 'src/app/services/auth.service';
import { SellerToolbarComponent } from '../../ui/seller-toolbar/seller-toolbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatSelectModule, SellerToolbarComponent]
})
export class LoginComponent {


  constructor(
    private _authService: AuthService
  ) { }

  userTypes = Object.values(UserType);

  isRegistering = false;

  loginData = {
    username: '',
    password: ''
  };


  registerData = {
    userType: UserType.BUYER, // default value
    username: '',
    password: '',
    email: '',
  };

  onLoginSubmit() {
    console.log('Submitted login:', this.loginData);

    this._authService.login(this.loginData.username, this.loginData.password)

    // Reset the form after submission
    this.loginData = {
      username: '',
      password: ''
    };
  }

  onRegisterSubmit() {
    // Implement your registration logic here
    console.log('Submitted registration:', this.registerData);

    this._authService.register(
      this.registerData.userType,
      this.registerData.username,
      this.registerData.password,
      this.registerData.email)

    // Reset the registration form
    this.registerData = { userType: UserType.BUYER, username: '', password: '', email: '' };
  }

  toggleForm() {
    this.isRegistering = !this.isRegistering;
  }
}
