import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRule } from '../models/rule';

@Injectable({
  providedIn: 'root'
})
export class RuleService {
  constructor(
    private _httpClient: HttpClient,
  ) {
  }

  private host: string = 'http://localhost:8080'
  private basePath: string = '/api/v1/admin/rules'

  getAll(): Observable<IRule[]> {
    return this._httpClient.get<IRule[]>(this.host + this.basePath)
  }

  createRule(rule: IRule): Observable<any> {
    return this._httpClient.post(this.host + this.basePath, rule)
  }

  patchRule(id: string, rule: IRule): Observable<any> {
    return this._httpClient.patch(this.host + this.basePath + `/${id}`, rule)
  }

  deleteRule(id: string): Observable<any> {
    return this._httpClient.delete(this.host + this.basePath + `/${id}`)
  }
}
