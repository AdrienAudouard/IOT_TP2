import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { NguiMapModule} from '@ngui/map';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { TableComponent } from './table/table.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { DashboardService } from './dashboard/dashboard.service';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LedStatePipe } from './dashboard/led-sate.pipe';
import { TokenInterceptor } from './token.interceptor';
import { DashboardMqttComponent } from './dashboard-mqtt/dashboard-mqtt.component';
import {
  MqttModule,
  MqttService,
  IMqttServiceOptions
} from 'ngx-mqtt';
import { DashboardMqttService } from './dashboard-mqtt/dashboard-mqtt.service';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'm24.cloudmqtt.com',
  port: 38060,
  connectOnCreate: true,
  protocol: 'wss',
  username: 'jpuqjxky',
  password: 'AtH50qUjgJjR'
};

export function mqttServiceFactory() {
  return new MqttService(MQTT_SERVICE_OPTIONS);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppComponent,
    DashboardComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    LedStatePipe,
    DashboardMqttComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'})
  ],
  providers: [
    DashboardService,
    DashboardMqttService,
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  exports: [LedStatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
