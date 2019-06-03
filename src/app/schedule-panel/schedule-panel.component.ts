// Models
import { Song } from '../../models/song.model';

// Components
import { Component, OnInit, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { Versicles } from 'src/models/versicles.model';
import { Scriptures } from 'src/models/scriptures.model';

@Component({
  selector: 'app-schedule-panel',
  templateUrl: './schedule-panel.component.html',
  styleUrls: ['./schedule-panel.component.scss']
})
export class SchedulePanelComponent implements OnInit, OnChanges {
  @Input() savedSchedule: (Song|Scriptures)[] = [];
  @Output() displaySong: EventEmitter<Song> = new EventEmitter();
  @Output() liveSong: EventEmitter<Song> = new EventEmitter();
  @Output() displayVerse: EventEmitter<Versicles> = new EventEmitter();
  scheduleList: (Song|Scriptures)[] = [];
  counter: number = 0;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(){
    this.scheduleList = this.savedSchedule || [];

  }
  addToSchedule(verse: Scriptures){
    this.scheduleList = [...this.scheduleList, {...verse , key: `v${this.counter}`}];
    this.stored();
    this.counter++;
  }
  selectedSong(song: Song){
    this.scheduleList = [...this.scheduleList, {...song , key: `s${this.counter}`}];
    this.stored();
    this.counter++;
  }
  removedSong(removed: Song){
    this.scheduleList = this.scheduleList.filter((song: Song) => song.key !== removed.key);
    this.stored();
  }
  showSong(song: Song){
    this.displaySong.emit(song);
  }
  presentSong(song: Song){
    this.liveSong.emit(song);
  }
  stored(){
    localStorage.setItem('actualSchedule', JSON.stringify(this.scheduleList.map((item:any) => item.id || item.quote )));
  }
}
