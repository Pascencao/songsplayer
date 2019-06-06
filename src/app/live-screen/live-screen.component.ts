import { Component, OnInit } from '@angular/core';
import { Verse } from 'src/models/verse.model';
import { Song } from 'src/models/song.model';
import { DOMAIN } from '../domain.constants';

@Component({
  selector: 'app-live-screen',
  templateUrl: './live-screen.component.html',
  styleUrls: ['./live-screen.component.scss']
})
export class LiveScreenComponent implements OnInit {
  activeVerse: Verse;
  activeSong: Song;
  styleConfig: any;
  clear: boolean = false;
  black: boolean = false;
  showLogo: boolean = false;
  logo: string = null;

  constructor() { 
    this.styleConfig = {
      background: '#000',
      width: '100vw',
      height: '100vh'
    }
    if (window.addEventListener) {
     window.addEventListener("message", this.receiveMessage.bind(this));
    } else {
      (<any>window).attachEvent("onmessage", this.receiveMessage.bind(this));
    }
    this.logo = JSON.parse(localStorage.getItem('profile')).logo;
  }
  receiveMessage(msg){
    msg.data.verse && this.setVerse(msg.data.verse);
    msg.data.song && this.configSong(msg.data.song);
    msg.data.action && msg.data.action === 'LOGO_SCREEN' && this.toggleLogo();
    msg.data.action && msg.data.action === 'CLEAR_SCREEN' && this.toggleClearScreen();
    msg.data.action && msg.data.action === 'BLACK_SCREEN' && this.toggleBlackScreen()
  }

  setVerse(verse: Verse){
    this.activeVerse = verse;
    if(this.activeSong && this.activeSong.defaultBackground){
      this.styleConfig.background = this.getBackground(this.activeSong.defaultBackground.url);
    }
    if(this.activeVerse.background){
      this.styleConfig.background = this.getBackground(this.activeVerse.background);
    }
  }
  configSong(song: Song){
    this.activeSong = song;
    if(this.activeSong.defaultBackground){
      this.styleConfig.background = this.getBackground(this.activeSong.defaultBackground.url);
    }
  }
  toggleLogo(){
    this.showLogo = !this.showLogo;
    this.styleConfig.background = this.showLogo ? (this.logo ? this.getBackground(this.logo) : '#000') : (this.activeVerse && this.activeVerse.background ? this.getBackground(this.activeVerse.background): '#000');
  }
  toggleClearScreen(){
    this.clear = !this.clear;
  }
  toggleBlackScreen(){
    this.black = !this.black;
    if(this.black){
      this.styleConfig.background = '#000';
    } else {
      this.styleConfig.background = this.activeVerse.background ? this.getBackground(this.activeVerse.background) : '#000';

    }
  }
  getBackground(url){
    return `url('${DOMAIN}${url}') no-repeat transparent`
  }
  ngOnInit() {
  }

}
