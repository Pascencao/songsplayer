import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOMAIN } from '../domain.constants';
import { Observable } from 'rxjs';
import { ApiCommsService } from './api-comms.service';

@Injectable({
  providedIn: 'root'
})
export class BibleService {
  bibleUrl: string = `${DOMAIN}/bibles/`;
  rv60Url: string = `${DOMAIN}/rv1960s/`
  
  constructor(private apiSrv:ApiCommsService) { }

  getBooks(): Observable<any>{
    return this.apiSrv.call({
      url: this.bibleUrl,
      method: 'get', 
      options: {
        params:{
          bible: 'rv1960s'
        }
      }
    })

  }
  getVersicle(query){
    return this.apiSrv.call({
      method: 'get',
      url: this.rv60Url,
      options:{
        params:{
          _limit: query.limit || "10",
          book_contains: query.book,
          chapter: query.chapter || "1",
          _start: query.verse ? (query.verse-1)+'' : "0"
        }
      }
    })
  }
}
