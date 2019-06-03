import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSongComponent } from './new-song.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Song } from 'src/models/song.model';
import { Verse } from 'src/models/verse.model';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule } from '@angular/common/http';

describe('NewSongComponent', () => {
  let component: NewSongComponent;
  let fixture: ComponentFixture<NewSongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        AngularFontAwesomeModule,
        HttpClientModule,
        ReactiveFormsModule],
      declarations: [ NewSongComponent ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSongComponent);
    component = fixture.componentInstance;
    component.newSong = new Song({id: 'asd',name: 'This is my song', verse: [new Verse()], defaultBackground: null, order: '001'});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
