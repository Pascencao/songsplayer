import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongPreviewComponent } from './song-preview.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SongPreviewComponent', () => {
  let component: SongPreviewComponent;
  let fixture: ComponentFixture<SongPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongPreviewComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
