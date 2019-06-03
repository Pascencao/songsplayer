import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulePanelComponent } from './schedule-panel.component';
import { Song } from 'src/models/song.model';
import { Verse } from 'src/models/verse.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Scriptures } from 'src/models/scriptures.model';
import { Versicles } from 'src/models/versicles.model';

describe('SchedulePanelComponent', () => {
  let component: SchedulePanelComponent;
  let fixture: ComponentFixture<SchedulePanelComponent>;
  const mockSong = new Song({
        id: 'adas', 
        name: 'My First Song', 
        verse: [new Verse({id: 'sdadoke', lirycs: 'This is my test verse', isChorus: false})], 
        defaultBackground: null, 
        order: '001'
      });
  const mockScripture = new Scriptures({
        quote: 'Juan 3:16', 
        verse: [new Versicles({id: 1, text: 'Porque de tal manera amó Dios al mundo que entrego a su hijo unigenito para que todo aquel que en él crea no se pierda más tenga vida eterna', book: 'juan', chapter: 3, verse: 16})]
      });
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule ],
      declarations: [ SchedulePanelComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));
  describe('Mocking stored', ()=> {
    beforeEach(() => {
      fixture = TestBed.createComponent(SchedulePanelComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      spyOn(component, 'stored').and.callThrough();
    });

    it('add Song to schedule', () => {
      expect(component.counter).toBe(0);
      expect(component.scheduleList.length).toBe(0);
      component.selectedSong(mockSong);
      expect(component.scheduleList.length).toBe(1);
      expect(component.scheduleList[0].key).toBe('s0');
      expect(component.stored).toHaveBeenCalled();
      expect(component.counter).toBe(1);
    });
    

    it('add Scripture to schedule', () => {
      expect(component.scheduleList.length).toBe(0);
      
      component.addToSchedule(mockScripture);
      
      expect(component.scheduleList.length).toBe(1);
      expect(component.scheduleList[0].key).toBe('v0');
      expect(component.stored).toHaveBeenCalled();
      expect(component.counter).toBe(1);
    });
    it('remove item from the schedule',() => {
      expect(component.scheduleList.length).toBe(0);
      component.addToSchedule(mockScripture);
      component.selectedSong(mockSong);
      expect(component.scheduleList.length).toBe(2);
      component.removedSong({key: 's1', ...mockSong});
      expect(component.scheduleList.length).toBe(1);
      expect(component.stored).toHaveBeenCalled();
      expect(component.counter).toBe(2);
    });
  });
  describe('Events', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(SchedulePanelComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      spyOn(component.displaySong, 'emit');
      spyOn(component.liveSong, 'emit');
    });
    it('preview the current Song', () => {
      component.showSong(mockSong);
      expect(component.displaySong.emit).toHaveBeenCalledWith(mockSong);
    });
    it('send Song to live Screen', () => {
      component.presentSong(mockSong);
      expect(component.liveSong.emit).toHaveBeenCalledWith(mockSong);
    });
  })
});
