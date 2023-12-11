import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserType } from '../models/enum/userType';
import { IUserAuth } from '../models/user-auth';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _httpClient: HttpClient,
    private _localStorageService: LocalStorageService,
    private _router: Router
  ) { }

  private host: string = 'http://localhost:8080'
  private basePath: string = '/api/v1/auth'

  logout() {
    this._localStorageService.setAuthToken(null)
    this._localStorageService.setUserId(null)
    this._localStorageService.setUserType(null)

    this._router.navigate(['/main']);
  }

  login(login: string, password: string): void {
    const requestBody = {
      username: login,
      password: password
    };

    this._httpClient.post<IUserAuth>(this.host + this.basePath + "/login", requestBody)
      .subscribe(response => {
        console.log(response)
        this._localStorageService.setAuthToken(response.token)
        this._localStorageService.setUserType(response.userType)
        this._localStorageService.setUserId(response.id)

        if (response.userType === UserType.BUYER) {
          this._router.navigate(['/main']);
        }
        if (response.userType === UserType.SELLER) {
          this._router.navigate(['/seller-property']);
        }
      })
  }

  register(userType: UserType, username: string, password: string, email: string): void {
    const requestBody = {
      username: username,
      password: password,
      userType: userType,
      email: email,
    };

    this._httpClient.post<IUserAuth>(this.host + this.basePath + "/register", requestBody)
      .subscribe(response => {
        console.log(response)
        this._localStorageService.setAuthToken(response.token)
        this._localStorageService.setUserType(response.userType)
        this._localStorageService.setUserId(response.id)

        if (response.userType === UserType.BUYER) {
          this._router.navigate(['/main']);
        }
        if (response.userType === UserType.SELLER) {
          this._router.navigate(['/seller-property']);
        }
      })

  }
}
