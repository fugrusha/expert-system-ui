import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICity } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  private host: string = 'http://localhost:8080'
  private basePath: string = '/api/v1/cities'

  getAll(): Observable<ICity[]> {
    return this._httpClient.get<ICity[]>(this.host + this.basePath)
  }
}
