import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SongsService } from '../services/songs.service';
import { ScheduleService } from '../services/schedule.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private scheduleSrv: ScheduleService, 
    private fb:FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.scheduleSrv.getSavedSchedules()
      .subscribe(sche => {
        this.savedSchedules = sche;
      })
  }

  getSaved(ids){
    this.songSrv.getBachSongs(ids)
    .subscribe(songs => {
      this.savedList.emit(songs);
    })
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
    }, ()=>{
      this.scheduleForm.reset();
    });
    
  }
  openConfig(modal){
    this.modalService.open(modal,{size: 'lg', centered: true, keyboard: false}).result.then(() => {
      console.log('Config guardadas');
    })
  }
}
