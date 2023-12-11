import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private _httpClient: HttpClient,
    private _localStorageService: LocalStorageService
  ) {
  }


  uploadImage(file: File, relativePath: string): Observable<any>{
    const formData = new FormData()
    formData.append('file', file, relativePath)

    return this._httpClient.post('http://localhost:8080/api/v1/images/upload',
      formData,
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
