import { Injectable, Injector } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ApiCommsService {
  httpOptions: any = {};
  userSrv: UserService;
  constructor(
    private http:HttpClient,
    private injector: Injector
  ) { 

    this.userSrv = this.injector.get(UserService);
  }

  call(config): Observable<any>{
    let token = localStorage.getItem('token');
    let { username } = JSON.parse(localStorage.getItem('profile') || '{}');
    let requestObj: Observable<any>;

    if(token){
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      };
    }
    if(!username && this.needToAddUser(config.url) ){
      return throwError({error: 'theres no user registerd'});
    }
    if(config.method === 'get'){
      config.options = {...config.options, ...this.httpOptions};
      if(username && this.needToAddUser(config.url)){
        config.options.params = {...config.options.params, uid: username};
      }

      requestObj = this.http[config.method](config.url, config.options);
    } else {
      if(username && this.needToAddUser(config.url)){
        config.body = { ...config.body, uid: username };
      }

      requestObj = this.http[config.method](config.url, config.body, this.httpOptions);
    }
    
    return requestObj.pipe(catchError((response) => {
      if(response.error.statusCode === 403){
        this.userSrv.logout();
      }
      return response;
    }));
  }

  needToAddUser(url){
    return !url.match(/(bibles|rv1960s|upload|users|auth)/);
  }
}
