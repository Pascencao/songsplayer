import { Component, OnInit } from '@angular/core';
import { Song } from 'src/models/song.model';
import { Verse } from 'src/models/verse.model';
import { Versicles } from 'src/models/versicles.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  public selectedSong: Song;
  public liveSong: Song;
  public restoredSongs: Song[];
  constructor() { }

  ngOnInit() {
  }
  songSelected(song: Song){
    this.selectedSong = song;
  }
  presentSong(song: Song){
    this.liveSong = song;
  }
  versicleSelected(verse: Versicles){
    console.log(verse);
  }
  restoredSchedule(songs:Song[]){
    this.restoredSongs = songs
  }
}
