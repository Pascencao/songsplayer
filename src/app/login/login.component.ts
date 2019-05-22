import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginIncorrect: boolean = false;

  constructor(private fb:FormBuilder, private userSrv:UserService, private router:Router) { }
  
  loginForm = this.fb.group({
    identifier: ['', Validators.required],
    password: ['', Validators.required]
  })

  ngOnInit() {
  }
  
  login($event){
    this.loginIncorrect = false;
    $event.preventDefault();
    this.userSrv.authenticate(this.loginForm.value).subscribe(user => {
      this.router.navigate(['/dashboard']);
    }, () => {
      this.loginIncorrect = true;
    })
  }

}
