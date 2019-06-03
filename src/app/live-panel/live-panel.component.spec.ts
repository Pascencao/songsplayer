import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivePanelComponent } from './live-panel.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LivePanelComponent', () => {
  let component: LivePanelComponent;
  let fixture: ComponentFixture<LivePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivePanelComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
