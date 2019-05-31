import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Song } from 'src/models/song.model';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { SongsService } from '../services/songs.service';

@Component({
  selector: 'app-new-song',
  templateUrl: './new-song.component.html',
  styleUrls: ['./new-song.component.scss']
})
export class NewSongComponent implements OnInit {
  @Input() newSong: Song;
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  file: any = {};
  songForm = this.fb.group({
    name: ['', [Validators.required]],
    order: [''],
    verse: this.fb.array([
      this.fb.group({
        lirycs: ['', [Validators.required]],
        isChorus: [false]
      })
    ]),
    defaultBackground: [null]
  })

  constructor(private fb: FormBuilder, private songSrv: SongsService) {}

  ngOnInit() {
  }
  get verses(): FormArray { return this.songForm.get('verse') as FormArray; }
  addVerse(){
    this.verses.push(
      this.fb.group({
        lirycs: ['', [Validators.required]],
        isChorus: [false]
      })
    );
  }
  onFileChange(event) {
    this.file = event.srcElement.files[0];
  }
  removeVerse(index: number){
    this.verses.removeAt(index);
  }
  saveModal(){
    this.songSrv.createFullSong({...this.songForm.value, defaultBackground: this.file})
    .subscribe(items => {
      console.log('NEW SON', items);
    });
    this.closeModal.emit({...this.songForm.value, defaultBackground: this.file});
  }
}
