import { Component, OnInit } from '@angular/core';
import { CacheSaveService } from './services/cache-save.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-cache-route-reuse';
  constructor(public cacheSrv: CacheSaveService) {}

  public loadDate: string = 'not set';
  ngOnInit(): void {
    let d = new Date();
    this.loadDate = `${d.getHours()}:${d.getMinutes()}':${d.getSeconds()}"`;
  }
}
