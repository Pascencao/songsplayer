import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOMAIN } from '../domain.constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BibleService {
  bibleUrl: string = `${DOMAIN}/bibles/`;
  rv60Url: string = `${DOMAIN}/rv1960s/`
  constructor(private http:HttpClient) { }
  getBooks(): Observable<any>{
    return this.http.get(this.bibleUrl, {
      params:{
        bible: 'rv1960s'
      }
    });
  }
  getVersicle(query){
    return this.http.get(this.rv60Url, {
      params:{
        _limit: "10",
        book_contains: query.book,
        chapter: query.chapter || "1",
        _start: query.verse ? (query.verse-1)+'' : "0"
      }
    });
  }
}
