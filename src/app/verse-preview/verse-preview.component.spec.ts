import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VersePreviewComponent } from './verse-preview.component';
import { ReplaceNewLinePipe } from '../replace-new-line.pipe';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('VersePreviewComponent', () => {
  let component: VersePreviewComponent;
  let fixture: ComponentFixture<VersePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VersePreviewComponent, ReplaceNewLinePipe ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VersePreviewComponent);
    component = fixture.componentInstance;
    component.isLive = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
