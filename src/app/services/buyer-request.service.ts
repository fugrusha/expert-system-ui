import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBuyerRequest } from '../models/buyer-request';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class BuyerRequestService {

  constructor(
    private _httpClient: HttpClient,
    private _localStorageService: LocalStorageService
  ) {
  }

  private host: string = 'http://localhost:8080'
  private basePath: string = '/api/v1/requests'

  getAllSellerRequests(): Observable<IBuyerRequest[]> {
    const userId = this._localStorageService.getUserId()
    return this._httpClient.get<IBuyerRequest[]>(this.host + this.basePath + `?sellerId=${userId}`,
    this.getRequestOptions())
  }

  getAllBuyerRequests(): Observable<IBuyerRequest[]> {
    const userId = this._localStorageService.getUserId()
    return this._httpClient.get<IBuyerRequest[]>(this.host + this.basePath + `?buyerId=${userId}`,
    this.getRequestOptions())
  }

  getOne(requestId: string): Observable<IBuyerRequest> {
    const userId = this._localStorageService.getUserId()
    return this._httpClient.get<IBuyerRequest>(this.host + this.basePath + `/${requestId}`,
    this.getRequestOptions())
  }

  create(propertyId: string): Observable<IBuyerRequest> {
    const userId = this._localStorageService.getUserId()
    return this._httpClient.post<IBuyerRequest>(this.host + this.basePath,
    {
      propertyId: propertyId,
      buyerId: userId
    },
    this.getRequestOptions())
  }

  cancelRequest(requestId: string): Observable<any> {
    const userId = this._localStorageService.getUserId()
    return this._httpClient.patch<IBuyerRequest>(this.host + this.basePath + `/${requestId}`,
    {
      status: 'CANCELLED'
    },
    this.getRequestOptions())
  }

  processRequest(requestId: string): Observable<any> {
    const userId = this._localStorageService.getUserId()
    return this._httpClient.patch<IBuyerRequest>(this.host + this.basePath + `/${requestId}`,
    {
      status: 'PROCESSING'
    },
    this.getRequestOptions())
  }

  completeRequest(requestId: string): Observable<any> {
    const userId = this._localStorageService.getUserId()
    return this._httpClient.patch<IBuyerRequest>(this.host + this.basePath + `/${requestId}`,
    {
      status: 'COMPLETED'
    },
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
