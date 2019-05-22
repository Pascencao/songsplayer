import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Verse } from 'src/models/verse.model';
import { Versicles } from 'src/models/versicles.model';

@Component({
  selector: 'app-verse-list',
  templateUrl: './verse-list.component.html',
  styleUrls: ['./verse-list.component.scss']
})
export class VerseListComponent implements OnInit {
  @Input() verses:(Verse|Versicles)[] = [];
  @Output()  onSelection: EventEmitter<Verse|Versicles> = new EventEmitter();
  active: number;
  constructor() { }

  ngOnInit() {
  }
  displayVerse(verse: Verse|Versicles, active: number){
    this.active = active;
    this.onSelection.emit(verse);
  }
}
