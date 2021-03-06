import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable()
export class DashboardService {
  httpOptions = { headers: new HttpHeaders({ 'x-api-key':  environment.apiKey })};

  constructor(public httpClient: HttpClient) { }

  getLightState() {
    const url = `${environment.apiUrl}/led_state`;
    return this.httpClient.get(url);
  }

  turnOnLight() {
    const url = `${environment.apiUrl}/led_state`;
    return this.httpClient.post(url, {value: true});
  }

  turnOffLight() {
    const url = `${environment.apiUrl}/led_state`;
    return this.httpClient.post(url, {value: false});
  }

  getLatestLum() {
    const url = `${environment.apiUrl}/lumiere/latest`;
    return this.httpClient.get(url);
  }

  getLums(count: number = 20) {
    const url = `${environment.apiUrl}/lumiere?count=${count}`;
    return this.httpClient.get(url);
  }

  getLatestTemp() {
    const url = `${environment.apiUrl}/temperature/latest`;
    return this.httpClient.get(url);
  }

  getTemps(count: number = 20) {
    const url = `${environment.apiUrl}/temperature?count=${count}`;
    return this.httpClient.get(url);
  }
}
