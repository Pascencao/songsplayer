import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DOMAIN } from '../domain.constants';
import { ApiCommsService } from './api-comms.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  scheduleUrl:string = `${DOMAIN}/schedules/`;

  constructor(private apiSrv:ApiCommsService) { }

  saveSchedule(sche): Observable<any>{
    return this.apiSrv.call({
      method: 'post',
      url: this.scheduleUrl,
      body: sche
    });
  }
  getSavedSchedules(): Observable<any> {
    return this.apiSrv.call({
      method: 'get',
      url: this.scheduleUrl,
      options: {
        params: {
          _limit:15
        }
      }
    });
  }
}
