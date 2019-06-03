import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsListComponent } from './songs-list.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from '../search.pipe';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SongsService } from '../services/songs.service';
import { HttpClientModule } from '@angular/common/http';

describe('SongsListComponent', () => {
  let component: SongsListComponent;
  let fixture: ComponentFixture<SongsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [SongsService],
      imports: [
        AngularFontAwesomeModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
      ],
      declarations: [ SongsListComponent, SearchPipe ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
