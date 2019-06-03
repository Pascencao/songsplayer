import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleListComponent } from './schedule-list.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ScheduleListComponent', () => {
  let component: ScheduleListComponent;
  let fixture: ComponentFixture<ScheduleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularFontAwesomeModule],
      declarations: [ ScheduleListComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
