import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProperty } from '../models/property';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SellerPropertyService {

  constructor(
    private _httpClient: HttpClient,
    private _localStorageService: LocalStorageService
  ) {
  }

  private host: string = 'http://localhost:8080'
  private basePath: string = '/api/v1/sellers'

  getAll(): Observable<IProperty[]> {
    let userId = this._localStorageService.getUserId()
    return this._httpClient.get<IProperty[]>(
      this.host + this.basePath + `/${userId}` + '/properties',
      this.getRequestOptions())
  }

  getOne(propertyId: string): Observable<IProperty> {
    let userId = this._localStorageService.getUserId()
    return this._httpClient.get<IProperty>(
      this.host + this.basePath + `/${userId}` + '/properties' + `/${propertyId}`,
      this.getRequestOptions())
  }

  create(property: IProperty): Observable<any> {
    let userId = this._localStorageService.getUserId()
    return this._httpClient.post(
      this.host + this.basePath + `/${userId}` + '/properties',
      property,
      this.getRequestOptions())
  }

  patch(propertyId: string, property: IProperty): Observable<any> {
    let userId = this._localStorageService.getUserId()
    return this._httpClient.patch(
      this.host + this.basePath + `/${userId}` + '/properties' + `/${propertyId}`,
      property,
      this.getRequestOptions())
  }

  delete(propertyId: string): Observable<any> {
    let userId = this._localStorageService.getUserId()
    return this._httpClient.delete(
      this.host + this.basePath + `/${userId}` + '/properties' + `/${propertyId}`,
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
