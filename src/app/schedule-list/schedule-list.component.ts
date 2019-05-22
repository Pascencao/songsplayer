// Models
import { Song } from '../../models/song.model';

// Components
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { Versicles } from 'src/models/versicles.model';
import { Scriptures } from 'src/models/scriptures.model';


@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {
  @Input() scheduleList: (Song|Scriptures)[];
  @Output() removeSong: EventEmitter<Song|Versicles> = new EventEmitter();
  @Output() previewSong: EventEmitter<Song|Versicles> = new EventEmitter();
  @Output() liveSong: EventEmitter<Song|Versicles> = new EventEmitter();
  isDoubleClick: boolean = false;
  constructor(private utils: UtilsService ) { }

  ngOnInit() {
  }
  removeSongFormSchedule(removeSong: Song|Versicles){
    this.scheduleList = this.scheduleList.filter((item: Song|Scriptures) => item.key !== removeSong.key);
    this.removeSong.emit(removeSong);
  }
  displaySong(song: Song|Versicles){
    if(this.isDoubleClick){
      this.presentSong(song);
      this.isDoubleClick = false;
    }
    this.previewSong.emit(song);
    this.isDoubleClick = !this.isDoubleClick;
    setTimeout(() => {
      this.isDoubleClick = false;
    },1000);
  }
  moveUp(i){
    this.scheduleList = this.utils.move(this.scheduleList, i, i-1);
  }
  moveDown(i){
    this.scheduleList = this.utils.move(this.scheduleList, i, i+1);
  }
  presentSong(song: Song|Versicles){
    this.liveSong.emit(song);
  }
}
