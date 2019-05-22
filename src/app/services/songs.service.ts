import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Song } from 'src/models/song.model';
import { Verse } from 'src/models/verse.model';
import { Observable, of, generate} from 'rxjs';
// import { forkJoin } from "rxjs/observable";
import { mergeMap } from 'rxjs/operators';
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
    return this.api.call<any[]>({url: `${this.songsUrl}${id}`, method: 'get'});
  }
  getBachSongs(ids: number[]){
    let idsStg = '?';
    ids.map(id => { 
      idsStg += `id_in=${id}&`;
    })
    return this.http.get<any[]>(`${this.songsUrl}${idsStg}`);

  }
  createSong(newSong): Observable<any> {
    return this.http.post<any[]>(this.songsUrl, newSong);
  }
  updateSong(song): Observable<any> {
    return this.http.put<any[]>(`${this.songsUrl}/${song.id}`, song);
  }
  deleteSong(id): Observable<any> {
    return this.http.delete<any[]>(`${this.songsUrl}/${id}`);
  }
  createVerse(verse): Observable<any> {
    return this.http.post<any[]>(`${this.verseUrl}`, verse);
  }
  deleteVerse(id): Observable<any> {
    return this.http.delete<any[]>(`${this.verseUrl}/${id}`);
  }
  updateVerse(verse): Observable<any> {
    return this.http.delete<any[]>(`${this.verseUrl}/${verse.id}`,verse);
  }
  addBackground(image, type, id){
    let form = new FormData();
    form.append('files',image);
    form.append('ref', type);
    form.append('field', (type == 'song'? 'defaultBackground' : 'background') );
    form.append('refId', id);
    return this.http.post(this.uploadUrl, form);
  }
  createFullSong(newSong){

    return this.createSong({
      name: newSong.name,
      order: newSong.order,
    }).subscribe((song: Song): any => {

      let verses = newSong.verse.map((verse: Verse) => {
        verse.song = song;
        return this.createVerse(verse).subscribe();
      })
      this.addBackground(newSong.defaultBackground, 'song', song.id).subscribe();
      return {song, verse: verses};
    })
  }
}
