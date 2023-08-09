import { Injectable } from '@angular/core';
import { IUserForm } from '../models/user-form';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserFormService {

  constructor(
    private _httpClient: HttpClient,
  ) {
  }

  private host: string = 'http://localhost:8080'
  private basePath: string = '/api/v1/applications'

  sendUserForm(userForm: IUserForm): Observable<any> {
    return this._httpClient.post(this.host + this.basePath, userForm)
  }
}
