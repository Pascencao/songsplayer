import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOMAIN } from '../domain.constants';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiCommsService } from './api-comms.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string = `${DOMAIN}/users/me`
  constructor(private http: HttpClient, private api:ApiCommsService) { }

  authenticate(credentials){

    return this.http.post(`${DOMAIN}/auth/local`, credentials).pipe(switchMap((response: any) =>{
      console.log(response)
      localStorage.setItem('token', response.jwt)
      return of(response);
    }))
  }
  getUserData(){
    return this.api.call({url: this.userUrl, method: 'get'});
  }
}
