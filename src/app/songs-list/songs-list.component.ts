// Models
import { Song } from '../../models/song.model';

// Components
import { Component, OnInit } from '@angular/core';
import { SongsService } from '../services/songs.service';
import { Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-songs-list',
  templateUrl: './songs-list.component.html',
  styleUrls: ['./songs-list.component.scss']
})
export class SongsListComponent implements OnInit {
  @Output() selectedSong: EventEmitter<any> = new EventEmitter();
  createdSong: Song[];
  songs: Song[];
  filter: string;
  constructor(
    private songsSrv: SongsService,
    private modalService: NgbModal
    ) { }

  ngOnInit() {
    this.songsSrv.getSongs()
      .subscribe((songs:Song[]) => {
        this.songs = songs;
      })
  }
  addSongToSchedule(song:Song){
    this.filter = null
    this.selectedSong.emit(song);
  }
  createSongModal(modal){
    this.modalService.open(modal,{ size: 'lg',centered: true, keyboard: true }).result.then((createdSong: Song) => {
      this.songs.push(createdSong)
    });
  }
}
