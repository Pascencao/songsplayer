import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DOMAIN } from '../domain.constants';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  scheduleUrl:string = `${DOMAIN}/schedules/`;

  constructor(private http:HttpClient) { }

  saveSchedule(sche): Observable<any>{
    return this.http.post(this.scheduleUrl, sche);
  }
  getSavedSchedules(): Observable<any> {
    return this.http.get(`${this.scheduleUrl}?_limit=15`);
  }
}
