import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Song } from 'src/models/song.model';
import { Verse } from 'src/models/verse.model';
import { DOMAIN } from '../domain.constants';

@Component({
  selector: 'app-song-preview',
  templateUrl: './song-preview.component.html',
  styleUrls: ['./song-preview.component.scss']
})
export class SongPreviewComponent implements OnInit, OnChanges {
  @Input() activeSong: Song = new Song();
  activeVerse: Verse;
  stylesConfig: {} = {};
  verses = [];
  constructor() {
   }

  ngOnInit() {
    this.activeSong = this.activeSong || new Song();
  }
  ngOnChanges(){
    this.verses = this.activeSong ? (this.activeSong.verse || this.activeSong['verses'] || []) : [];
    if(this.activeSong && this.activeSong.defaultBackground){
      this.stylesConfig = {
        background: `url(${DOMAIN}${this.activeSong.defaultBackground.url}) no-repeat transparent`,
        "background-size": 'cover'
      }
    }
  }
  displayVerse(verse: Verse){
    this.activeVerse = verse;
  }
}
