import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Song } from 'src/models/song.model';
import { Verse } from 'src/models/verse.model';
import { Observable, of, generate, forkJoin} from 'rxjs';
// import { forkJoin } from "rxjs/observable";
import { mergeMap, switchMap } from 'rxjs/operators';
import { DOMAIN } from '../domain.constants';
import { ApiCommsService } from './api-comms.service';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  songsUrl:string =  `${DOMAIN}/songs/`;
  verseUrl:string = `${DOMAIN}/verses/`;
  uploadUrl:string = `${DOMAIN}/upload/`;

  constructor(private http:HttpClient, private api:ApiCommsService) { }

  getSongs(id?): Observable<any> {
    id = id ? `/${id}` : '';
    return this.api.call({
      url: `${this.songsUrl}${id}`, method: 'get'
      });
  }
  getBachSongs(ids: number[]){
    let idsStg = '?';
    ids.map(id => { 
      idsStg += `id_in=${id}&`;
    })
    return this.api.call({url: `${this.songsUrl}${idsStg}`, method: 'get'});

  }
  createSong(newSong): Observable<any> {
    return this.api.call({url: this.songsUrl, method: 'post', body: newSong});
  }
  updateSong(song): Observable<any> {
    return this.api.call({url: `${this.songsUrl}/${song.id}`, method: 'put', body: song});
  }
  deleteSong(id): Observable<any> {
    return this.api.call({url: `${this.songsUrl}/${id}`, method: 'delete'});
  }
  createVerse(verse): Observable<any> {
    return this.api.call({url: this.verseUrl, method: 'post', body: verse});
  }
  deleteVerse(id): Observable<any> {
    return this.api.call({url: `${this.verseUrl}/${id}`, method: 'delete'});
  }
  updateVerse(verse): Observable<any> {
    return this.api.call({url: `${this.verseUrl}/${verse.id}`, method: 'put', body: verse});
  }
  addBackground(image, type, id){
    let form = new FormData();
    form.append('files',image);
    form.append('ref', type);
    form.append('field', (type == 'song'? 'defaultBackground' : 'background') );
    form.append('refId', id);
    return this.api.call({url: this.uploadUrl, method: 'post', body: form});
  }
  createFullSong(newSong){

    return this.createSong({
      name: newSong.name,
      order: newSong.order,
    }).pipe(
      switchMap((song: Song): any => {

        let verses = newSong.verse.map((verse: Verse) => {
          verse.song = song;
          return this.createVerse(verse);
        })
        if(newSong.defaultBackground){
          verses.push(this.addBackground(newSong.defaultBackground, 'song', song.id))
        }
        return forkJoin(...verses);
      })
    )
    .pipe(switchMap(item => {
      console.log('new song', item);
      return of({item})
    }))
  }
}
