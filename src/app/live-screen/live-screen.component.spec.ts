import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveScreenComponent } from './live-screen.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LiveScreenComponent', () => {
  let component: LiveScreenComponent;
  let fixture: ComponentFixture<LiveScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveScreenComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
