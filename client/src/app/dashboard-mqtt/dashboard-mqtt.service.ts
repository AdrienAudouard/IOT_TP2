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
                //mqttService.connect({username: 'jpuqjxky', password: 'AtH50qUjgJjR'});
  }

  getLightState() {
    const url = `${environment.apiUrl}/led_state`;
    return this.httpClient.get(url);
  }

  turnOnLight() {
    this.mqttService.publish('led', 'true').subscribe(() => {
      console.log('led turned on');
    }, (err) => {
      console.log(JSON.stringify(err));
    });
  }

  turnOffLight() {
    this.mqttService.publish('led', 'false').subscribe(() => {
      console.log('led turned false');
    }, (err) => {
      console.log(JSON.stringify(err));
    });
  }

  getLatestLum(): Observable<any> {
    return new Observable(observer => {
      this.lumSubscription = this.mqttService.observe('lum').subscribe((message: IMqttMessage) => {
        console.log('New lum received');
        console.log(JSON.stringify(message));
        console.log(JSON.stringify(message.payload.toString()));

        observer.next({ lumiere: parseInt(message.payload.toString()), date: new Date().getMilliseconds() });
      });
    });
  }

  getLums(count: number = 20) {
    const url = `${environment.apiUrl}/lumiere?count=${count}`;
    return this.httpClient.get(url);
  }
}
