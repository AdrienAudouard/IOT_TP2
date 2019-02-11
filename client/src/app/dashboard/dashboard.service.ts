import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable()
export class DashboardService {

  constructor(public httpClient: HttpClient) { }

  getLightState() {
    const url = `${environment.apiUrl}/led_state`;
    return this.httpClient.get(url);
  }
}
