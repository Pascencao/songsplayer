import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveScreenHandlersComponent } from './live-screen-handlers.component';

describe('LiveScreenHandlersComponent', () => {
  let component: LiveScreenHandlersComponent;
  let fixture: ComponentFixture<LiveScreenHandlersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveScreenHandlersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveScreenHandlersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
