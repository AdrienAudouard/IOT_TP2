import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subscription } from 'rxjs';

import {
  IMqttMessage,
  MqttModule,
  IMqttServiceOptions,
  MqttService
} from 'ngx-mqtt';



@Injectable()
export class DashboardMqttService {
  private httpOptions = { headers: new HttpHeaders({ 'x-api-key':  environment.apiKey })};
  private lumSubscription: Subscription;
  private ledSubscription: Subscription;

  constructor(public httpClient: HttpClient,
              public mqttService: MqttService) {
                mqttService.connect({username: 'jpuqjxky', password: 'AtH50qUjgJjR'});
  }

  getLightState() {
    const url = `${environment.apiUrl}/led_state`;
    return this.httpClient.get(url);
  }

  turnOnLight() {
    this.mqttService.publish('led', 'true');
  }

  turnOffLight() {
    this.mqttService.publish('led', 'true');
  }

  getLatestLum(): Observable<any> {
    return new Observable(observer => {
      this.lumSubscription = this.mqttService.observe('lum').subscribe((message: IMqttMessage) => {
        console.log('New lum received');
        console.log(JSON.stringify(message));

        observer.next({ lumiere: message.payload, date: new Date().getMilliseconds() });
      });
    });
  }

  getLums(count: number = 20) {
    const url = `${environment.apiUrl}/lumiere?count=${count}`;
    return this.httpClient.get(url);
  }
}
