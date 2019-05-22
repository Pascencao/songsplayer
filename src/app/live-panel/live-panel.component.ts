import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Song } from 'src/models/song.model';
import { Verse } from 'src/models/verse.model';
import { LIVE_WIN } from '../liveWin.constant';
import { DOMAIN } from '../domain.constants';

@Component({
  selector: 'app-live-panel',
  templateUrl: './live-panel.component.html',
  styleUrls: ['./live-panel.component.scss']
})
export class LivePanelComponent implements OnInit, OnChanges {
  @Input() liveSong: Song;
  activeVerse: Verse;
  liveWin: any;
  stylesConfig: any;
  constructor() {
  }

  ngOnInit() {
    this.liveSong = this.liveSong || new Song();
  }
  displayVerse(verse: Verse){
    this.activeVerse = verse;
    LIVE_WIN.postMessage({
      verse: verse
    });
  }
  
  ngOnChanges(){
    LIVE_WIN.postMessage({
      song: this.liveSong
    });
    if(this.liveSong && this.liveSong.defaultBackground){
      this.stylesConfig = {
        background: `url(${DOMAIN}${this.liveSong.defaultBackground.url}) no-repeat transparent`,
        "background-size": 'cover'
      }
    }
  }
}
