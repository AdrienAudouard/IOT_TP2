import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMqttComponent } from './dashboard-mqtt.component';

describe('DashboardMqttComponent', () => {
  let component: DashboardMqttComponent;
  let fixture: ComponentFixture<DashboardMqttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMqttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMqttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
