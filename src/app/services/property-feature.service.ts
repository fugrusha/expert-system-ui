import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPropertyFeature } from '../models/property-feature';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyFeatureService {

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  private host: string = 'http://localhost:8080'
  private basePath: string = '/api/v1/properties'

  getAll(): Observable<IPropertyFeature[]> {
    return this._httpClient.get<IPropertyFeature[]>(this.host + this.basePath)
  }

  create(propertyId: string, feature: IPropertyFeature): Observable<any> {
    return this._httpClient.post(this.host + this.basePath + '/properties' + `/${propertyId}` + '/features', feature)
  }

  deleteAll(propertyId: string): Observable<any> {
    return this._httpClient.delete(this.host + this.basePath + `/${propertyId}`)
  }
}
