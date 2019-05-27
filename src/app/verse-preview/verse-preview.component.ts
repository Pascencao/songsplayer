import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-verse-preview',
  templateUrl: './verse-preview.component.html',
  styleUrls: ['./verse-preview.component.scss']
})
export class VersePreviewComponent implements OnInit, OnChanges {
  @Input() activeVerse: any;
  @Input() isLive: boolean = false;
  incremnetal: number = 1;
  styles = {};
  constructor() { 
  }

  ngOnInit() {
    if(this.activeVerse){
      this.activeVerse.lirycs = this.activeVerse.lirycs && this.activeVerse.lirycs.replace(/↵/g, '<br/>');
    }
  }
  ngOnChanges(){
    let size = 20;
    let aux = this.activeVerse ? (this.activeVerse.lirycs || this.activeVerse.text) : '';
    if(aux.length <= 190){
      size = 40;
    }
    if(aux.length <= 140){
      size = 45;
    } 
    if(aux.length <= 90){
      size = 50;
    } 
    if(aux.length <= 50){
      size = 60;
    }
    this.styles = {
      "font-size": this.isLive ? (size * this.incremnetal)+'%' : `${size}%`
    }
  }
}
