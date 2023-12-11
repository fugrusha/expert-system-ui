import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';
import { IProperty } from '../models/property';

@Injectable({
  providedIn: 'root'
})
export class FavoritePropertyService {

  constructor(
    private _httpClient: HttpClient,
    private _localStorageService: LocalStorageService
  ) {
  }

  private host: string = 'http://localhost:8080'
  private basePath: string = '/api/v1/users'

  getAll(): Observable<IProperty[]> {
    const userId = this._localStorageService.getUserId()
    return this._httpClient.get<IProperty[]>(
      this.host + this.basePath + `/${userId}` + '/favorites',
      this.getRequestOptions())
  }

  create(propertyId: string): Observable<any> {
    const userId = this._localStorageService.getUserId()
    return this._httpClient.post(
      this.host + this.basePath + `/${userId}` + '/favorites',
      {
        propertyId: propertyId
      },
      this.getRequestOptions())
  }

  delete(propertyId: string): Observable<any> {
    const userId = this._localStorageService.getUserId()
    return this._httpClient.delete(this.host + this.basePath + `/${userId}` + '/favorites' + `/${propertyId}`,
    this.getRequestOptions())
  }

  private getRequestOptions() {
    let token = this._localStorageService.getAuthToken()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = {
      headers: headers
    };
    return requestOptions;
  }
}
