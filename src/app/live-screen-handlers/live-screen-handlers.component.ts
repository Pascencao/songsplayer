import { Component, OnInit } from '@angular/core';
import { LIVE_WIN } from '../liveWin.constant';

@Component({
  selector: 'app-live-screen-handlers',
  templateUrl: './live-screen-handlers.component.html',
  styleUrls: ['./live-screen-handlers.component.scss']
})
export class LiveScreenHandlersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  clear(){
    LIVE_WIN.postMessage({
      action: 'CLEAR_SCREEN'
    })
  }
  black(){
    LIVE_WIN.postMessage({
      action: 'BLACK_SCREEN'
    })
  }
  logo(){
    LIVE_WIN.postMessage({
      action: 'LOGO_SCREEN'
    })
  }
}
