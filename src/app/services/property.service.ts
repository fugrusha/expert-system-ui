import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProperty } from '../models/property';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  private host: string = 'http://localhost:8080'
  private basePath: string = '/api/v1/properties'

  getAll(): Observable<IProperty[]> {
    return this._httpClient.get<IProperty[]>(this.host + this.basePath)
  }

  getAllWithSearch(searchText: string): Observable<IProperty[]> {
    return this._httpClient.get<IProperty[]>(this.host + this.basePath + `?search=${searchText}`)
  }

  getOne(id: string): Observable<IProperty> {
    return this._httpClient.get<IProperty>(this.host + this.basePath + `/${id}`)
  }
}
