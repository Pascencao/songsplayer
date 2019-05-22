import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersePreviewComponent } from './verse-preview.component';

describe('VersePreviewComponent', () => {
  let component: VersePreviewComponent;
  let fixture: ComponentFixture<VersePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
