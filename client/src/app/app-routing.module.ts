import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { DashboardMqttComponent } from './dashboard-mqtt/dashboard-mqtt.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'http', component: DashboardComponent},
  {path: 'mqtt', component: DashboardMqttComponent},
  {path: '**', redirectTo: '/home'}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
