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
    this.styleConfig.background = this.showLogo ? '#000': this.getBackground(this.activeVerse.background);
  }
  toggleClearScreen(){
    this.clear = !this.clear;
  }
  toggleBlackScreen(){
    this.black = !this.black;
    this.styleConfig.background = this.black ? '#000' : this.getBackground(this.activeVerse.background);
  }
  getBackground(url){
    return `url('${DOMAIN}${url}') no-repeat transparent`
  }
  ngOnInit() {
  }

}
