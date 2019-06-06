import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOMAIN } from '../domain.constants';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiCommsService } from './api-comms.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl: string = `${DOMAIN}/users/me`
  uploadUrl:string = `${DOMAIN}/upload/`;
  constructor(private http: HttpClient, private api:ApiCommsService, private router: Router) { }

  authenticate(credentials){

    return this.http.post(`${DOMAIN}/auth/local`, credentials).pipe(switchMap((response: any) =>{
      localStorage.setItem('token', response.jwt)
      return of(response);
    }))
  }
  getUserData(){
    return this.api.call({url: this.userUrl, method: 'get'});
  }
  saveLogo(image, id){
    let form = new FormData();
    form.append('files', image);
    form.append('ref', 'user');
    form.append('field', 'logo' );
    form.append("source", "users-permissions" );
    form.append('refId', id);
    return this.api.call({url: this.uploadUrl, method: 'post', body: form});
  }
  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    this.router.navigate(['/login']);
  }
}
