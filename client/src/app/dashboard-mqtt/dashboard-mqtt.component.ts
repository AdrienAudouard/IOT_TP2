import { Component, OnInit } from '@angular/core';
import { DashboardMqttService } from './dashboard-mqtt.service';
import * as Chartist from 'chartist';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-mqtt',
  templateUrl: './dashboard-mqtt.component.html',
  styleUrls: ['./dashboard-mqtt.component.scss']
})
export class DashboardMqttComponent implements OnInit {
  public lightState = false;
  public latestLum = { value: '', date: '' };
  public latestTemp = { value: '', date: '' };
  public lumLoop: any;
  public lumChart: any;
  public lums: any[];
  public temps: any[];

  constructor(public dashboardService: DashboardMqttService) {
    this.lums = new Array();
    this.temps = new Array();
  }

  ngOnInit() {
    this.updateLightState();

    this.getLastLumValue();
    this.getLastTempValue();

    this.dashboardService.getLums().subscribe((res: any) => {
      this.lums = res.result;
      this.upateLumValueGraph();
    });
  }

  updateLightState() {
    this.dashboardService.getLightState().subscribe((response: any) => {
      console.log(response);
      this.lightState = response;
    }, (err: any) => {
      console.log(err);
    });
  }

  getLastLumValue() {
    this.dashboardService.getLatestLum().subscribe((lum: any) => {
      this.latestLum.value = lum.lumiere;
      this.latestLum.date = lum.date;

      this.lums.unshift(JSON.parse(JSON.stringify(lum)));
      this.upateLumValueGraph();
    });
  }

  getLastTempValue() {
    this.dashboardService.getLatestTemp().subscribe((temp: any) => {
      this.latestTemp.value = temp.temp + '°C';
      this.latestTemp.date = temp.date;

      this.temps.unshift(JSON.parse(JSON.stringify(temp)));
      this.upateTempValueGraph();
    });
  }

  turnOnLight() {
    this.dashboardService.turnOnLight();
    this.lightState = true;
  }

  turnOffLight() {
    this.dashboardService.turnOffLight();
    this.lightState = false;
  }

  upateLumValueGraph() {
    let high = 0;
    const values = [];
    const labels = [];

    for (const lum of this.lums) {
      const datePipe = new DatePipe('en-US');

      values.push(lum.lumiere);
      labels.push(datePipe.transform(lum.date, 'short'));

      if (lum.lumiere > high) {
        high = lum.lumiere;
      }
    }

    const options = {
      low: 0,
      high: high + 5,
      showArea: true,
      height: '245px',
      axisX: {
        showGrid: false,
      },
      lineSmooth: Chartist.Interpolation.simple({
        divisor: 3
      }),
      showLine: true,
      showPoint: true,
    };

    const datas = {
      labels,
      series: [values]
    };

    const responsive: any[] = [
      ['screen and (max-width: 3000px)', {
        axisX: {
          labelInterpolationFnc(value: string, index: number) {
            return index % 4 === 0 ? value : null;
          }
        }
      }]
    ];

    this.lumChart = new Chartist.Line('#chartHours', datas, options, responsive);
  }

  upateTempValueGraph() {
    let high = 0;
    const values = [];
    const labels = [];

    for (const temp of this.temps) {
      const datePipe = new DatePipe('en-US');

      values.push(temp.temp);
      labels.push(datePipe.transform(temp.date, 'short'));

      if (temp.temp > high) {
        high = temp.temp;
      }
    }

    const options = {
      low: 0,
      high: high + 500,
      showArea: true,
      height: '245px',
      axisX: {
        showGrid: false,
      },
      lineSmooth: Chartist.Interpolation.simple({
        divisor: 3
      }),
      showLine: true,
      showPoint: true,
    };

    const datas = {
      labels,
      series: [values]
    };

    const responsive: any[] = [
      ['screen and (max-width: 3000px)', {
        axisX: {
          labelInterpolationFnc(value: string, index: number) {
            return index % 4 === 0 ? value : null;
          }
        }
      }]
    ];

    this.lumChart = new Chartist.Line('#chartTemp', datas, options, responsive);
  }
}
