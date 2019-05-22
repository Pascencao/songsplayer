import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiCommsService {
  httpOptions: any = {};
  constructor(private http:HttpClient) { }

  call(config){
    let token = localStorage.getItem('token');
    if(token){
      this.httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      };
    }
    if(config.method === 'get'){
      config.options = {...config.options, ...this.httpOptions};
       return this.http[config.method](config.url, config.options);
    } else {
       return this.http[config.method](config.url, config.options, this.httpOptions);
    }
  }
}
