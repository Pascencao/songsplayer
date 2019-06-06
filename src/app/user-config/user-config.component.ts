import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent implements OnInit {
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  file: any = {};
  user: any = {};
  userForm = this.fb.group({
    logo: [null]
  })

  constructor(private fb: FormBuilder, private userSrv:UserService) {
  }

  ngOnInit() {
    this.userSrv.getUserData().subscribe(user => {
      this.user = user;
      console.log(this.user)
    })
  }
  onFileChange(event){
    this.file = event.srcElement.files[0];
  }
  saveModal(){
    if(this.file.name){
      this.userSrv.saveLogo(this.file, this.user.id).subscribe(savedLogo => {
        let profile = JSON.parse(localStorage.getItem('profile'));
        profile.logo = savedLogo[0].url;
        localStorage.setItem('profile', JSON.stringify(profile));
        this.closeModal.emit();
      });
    } else {
      this.closeModal.emit();
    }
  }
}
