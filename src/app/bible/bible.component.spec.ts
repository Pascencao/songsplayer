import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibleComponent } from './bible.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../search.pipe';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BibleService } from '../services/bible.service';
import { HttpClientModule } from '@angular/common/http';

describe('BibleComponent', () => {
  let component: BibleComponent;
  let fixture: ComponentFixture<BibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, AngularFontAwesomeModule, HttpClientModule ],
      declarations: [ BibleComponent, SearchPipe ],
      providers: [BibleService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
