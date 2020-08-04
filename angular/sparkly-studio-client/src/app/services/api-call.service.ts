import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  public url: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'clientid': 'sparkey',
      'secret': 'qpalzmwiskxn'
    })
  };

  constructor(private httpClient: HttpClient) {
    const isDev = isDevMode();
    if (isDev) {
      this.url = 'http://localhost:5000';
    } else {
      this.url = 'https://flaska891ce0f.azurewebsites.net';
    }
  }

  postInput(data:object) {
    return this.httpClient.post(this.url, data, this.httpOptions);
  }
}
