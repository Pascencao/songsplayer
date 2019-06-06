import { Component, OnInit } from '@angular/core';
import { Song } from 'src/models/song.model';
import { Verse } from 'src/models/verse.model';
import { Versicles } from 'src/models/versicles.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  public selectedSong: Song;
  public liveSong: Song;
  public restoredSongs: Song[];
  constructor(
    private userSrv: UserService
  ) { }

  ngOnInit() {
    this.userSrv.getUserData().subscribe(user=>{
      let { username, logo } = user;
      console.log(logo)
      localStorage.setItem('profile', JSON.stringify({username, logo: logo.url}))
    })
  }
  songSelected(song: Song){
    this.selectedSong = song;
  }
  presentSong(song: Song){
    this.liveSong = song;
  }
  versicleSelected(verse: Versicles){
    // console.log(verse);
  }
  restoredSchedule(songs:Song[]){
    this.restoredSongs = songs
  }
}
