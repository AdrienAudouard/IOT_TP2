import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { DashboardService } from './dashboard.service';
import { interval } from 'rxjs';
import { DatePipe } from '@angular/common';
import { LedStatePipe } from './led-sate.pipe';

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  public lightState = '';
  public latestLum = { value: '', date: '' };
  public lumLoop: any;
  public lumChart: any;

  constructor(public dashboardService: DashboardService) {

  }

    ngOnInit() {
      this.updateLightState();

      this.getLastLumValue();

      this.upateLumValueGraph();


        var data = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          series: [
            [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
            [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
          ]
        };

        var options = {
            seriesBarDistance: 10,
            axisX: {
                showGrid: false
            },
            height: "245px"
        };

        var responsiveOptions: any[] = [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];

        new Chartist.Line('#chartActivity', data, options, responsiveOptions);

        var dataPreferences = {
            series: [
                [25, 30, 20, 25]
            ]
        };

        var optionsPreferences = {
            donut: true,
            donutWidth: 40,
            startAngle: 0,
            total: 100,
            showLabel: false,
            axisX: {
                showGrid: false
            }
        };

        new Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

        new Chartist.Pie('#chartPreferences', {
          labels: ['62%','32%','6%'],
          series: [62, 32, 6]
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
      this.lumLoop = interval(1000).subscribe(() => {
        this.dashboardService.getLatestLum().subscribe((lum: any) => {
          console.log(lum);
          this.latestLum.value = lum.result.lumiere;
          this.latestLum.date = lum.result.date;
        });
      });
    }

    upateLumValueGraph() {
      this.dashboardService.getLums().subscribe((res: any) => {
        let high = 0;
        const values = [];
        const labels = [];

        for (const lum of res.result) {
          const datePipe = new DatePipe('en-US');

          values.push(lum.lumiere);
          labels.push(datePipe.transform(lum.date, 'short'));

          if (lum.lumiere > high) {
            high = lum.lumiere;
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

        this.lumChart = new Chartist.Line('#chartHours', datas, options, responsive);
      });
    }


    turnOnLight() {
      this.dashboardService.turnOnLight().subscribe((response: any) => {
        this.lightState = response;
      }, (err) => {
        console.log(err);
      });
    }

    turnOffLight() {
      this.dashboardService.turnOffLight().subscribe((response: any) => {
        this.lightState = response;
      }, (err) => {
        console.log(err);
      });
    }

  }
