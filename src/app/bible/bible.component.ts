import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { BibleService } from '../services/bible.service';
import { Versicles } from 'src/models/versicles.model';
import { Scriptures } from 'src/models/scriptures.model';

@Component({
  selector: 'app-bible',
  templateUrl: './bible.component.html',
  styleUrls: ['./bible.component.scss']
})
export class BibleComponent implements OnInit {
  @ViewChild('searchVerse') searchVerse: any;
  @Output() toSchedule: EventEmitter<Scriptures> = new EventEmitter();
  scriptures: Scriptures = {quote: '', verse: []};
  isOpen: boolean = false;
  quote: string = '';
  booksList: any[] = [];
  selectedQuote: Versicles = new Versicles();
  versiclesList: Versicles[] = [];

  constructor(private bibleSrv:BibleService) { }

  ngOnInit() {
    this.bibleSrv.getBooks().subscribe(books => {
      this.booksList = books;
    })
  }
  selected(item){
    this.quote = item.label;
    this.isOpen = false;
    this.searchVerse.nativeElement.focus()
  }
  addToSchedule(item: Versicles){
    item.checked = !item.checked;
    if(item.checked){
      this.scriptures.verse = [...this.scriptures.verse, item];
    } else {
      this.scriptures.verse = this.scriptures.verse.filter(verse => {
        return item.book !== verse.book || item.chapter !== verse.chapter || item.verse !== verse.verse;
      })
    }
    this.scriptures.quote = this.buildQoute();
  }
  search(){
    if(this.quote && !!this.quote.match(/\d{1,3}/g)){
    let indexes = this.quote.match(/\d{1,3}/g)
    let book = this.quote.replace(/\d{1,3}/g, '').replace(':', '').trim();
    this.selectedQuote = new Versicles({book,chapter: parseInt(indexes[0]) || 1,verse: parseInt(indexes[1]) || 0, id: null, text: null});
      this.request({
        book,
        chapter: indexes[0] || 1,
        verse: indexes[1] || 1
      }).subscribe((versicles: Versicles[]) => {
        this.versiclesList = versicles;
        this.isOpen = false;
      })
    }
  }
  buildQoute(){
    let limit = '';
    if(this.scriptures.verse.length > 1){
      let lastVerse = this.scriptures.verse[this.scriptures.verse.length-1];
      if(this.scriptures.verse[0].chapter === lastVerse.chapter){
        limit = ` - ${lastVerse.verse}`;
      } else {
        limit = ` - ${lastVerse.chapter}:${lastVerse.verse}`;
      }
    }
    return `${this.scriptures.verse[0].book} ${this.scriptures.verse[0].chapter}:${this.scriptures.verse[0].verse}${limit}`;
  }
  sendScriptures(){
    this.toSchedule.emit(this.scriptures);
  }
  more(){
    let query = this.selectedQuote;
    query.verse += 10;
    this.request(query).subscribe((newVersicles: Versicles[]) => {
      this.versiclesList = [...this.versiclesList, ...newVersicles];
    });
  }
  request(query){
    return this.bibleSrv.getVersicle(query)
  }
}
