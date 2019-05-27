import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SongsService } from '../services/songs.service';
import { ScheduleService } from '../services/schedule.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BibleService } from '../services/bible.service';
import { of, Observable, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Scriptures } from 'src/models/scriptures.model';
import { Versicles } from 'src/models/versicles.model';
import { flatten } from '@angular/compiler';

@Component({
  selector: 'app-main-config',
  templateUrl: './main-config.component.html',
  styleUrls: ['./main-config.component.scss']
})
export class MainConfigComponent implements OnInit {
  @Output() savedList: EventEmitter<any> = new EventEmitter();
  canSave: boolean;
  savedSchedules: any[] = [];
  scheduleForm = this.fb.group({
    name: ['', Validators.required]
  });
  constructor(
    private songSrv: SongsService,
    private bibleSrv: BibleService,
    private scheduleSrv: ScheduleService, 
    private fb:FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.scheduleSrv.getSavedSchedules()
      .subscribe(sche => this.savedSchedules = sche || [])
  }

  getSaved(ids){
    let obs: Observable<any>[] = [];
    let quoates = ids.filter(item => item.match(/\w+\ [0-9]{1,3}:[0-9]{1,3}/g));
    let songsIds = ids.filter(item => !item.match(/\w+\ [0-9]{1,3}:[0-9]{1,3}/g));

    if(songsIds.length){
      obs.push(this.songSrv.getBachSongs(songsIds))
    }
    quoates.map(quote => {
      let indexes = quote.match(/\d{1,3}/g)
      let book = quote.replace(/\d{1,3}/g, '').replace(' -','').replace(':', '').trim();

      obs.push(
        this.bibleSrv.getVersicle({
          book,
          chapter: indexes[0] || 1,
          verse: indexes[1] || 1,
          limit: indexes[2] ? (indexes[2]-indexes[1])  : null
        }).pipe(switchMap((item: Versicles[]) => {
          let scripture:Scriptures = { quote, verse: item }
          return of(scripture);
        }))
      )
    })

    forkJoin(...obs)
    .subscribe(items => {
      items = flatten(items);
      this.savedList.emit(items);
    });

  }

  saveSchedule(modal){
    if(!localStorage.getItem('actualSchedule')){
      return null;
    }
    this.modalService.open(modal, { size: 'sm',centered: true, keyboard: true }).result.then((name: string) => {
      this.scheduleSrv.saveSchedule({
        ...this.scheduleForm.value,
        elements: JSON.parse(localStorage.getItem('actualSchedule'))
      }).subscribe();
      this.scheduleForm.reset();
    }, () => {
      this.scheduleForm.reset();
    });
    
  }
  openConfig(modal){
    this.modalService.open(modal,{size: 'lg', centered: true, keyboard: false}).result.then(() => {
      // console.log('Config guardadas');
    })
  }
}
