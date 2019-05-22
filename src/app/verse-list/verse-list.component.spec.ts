import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerseListComponent } from './verse-list.component';

describe('VerseListComponent', () => {
  let component: VerseListComponent;
  let fixture: ComponentFixture<VerseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerseListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
