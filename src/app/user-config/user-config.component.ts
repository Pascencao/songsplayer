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
  user: any;
  userForm = this.fb.group({
    name: ['', Validators.required],
    logo: [null]
  })

  constructor(private fb: FormBuilder, private UserSrv:UserService) {
    this.UserSrv.getUserData().subscribe(user => {
      this.user = user;
    })
  }

  ngOnInit() {
  }
  onFileChange(event){
    this.file = event.srcElement.files[0];

  }
  saveModal(){
    this.closeModal.emit();
  }
}
