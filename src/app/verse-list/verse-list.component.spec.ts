import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerseListComponent } from './verse-list.component';
import { RemoveNewLinePipe } from '../remove-new-line.pipe';

describe('VerseListComponent', () => {
  let component: VerseListComponent;
  let fixture: ComponentFixture<VerseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerseListComponent, RemoveNewLinePipe ]
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
