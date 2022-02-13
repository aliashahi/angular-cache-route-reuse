import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CacheSaveService } from './services/cache-save.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-cache-route-reuse';
  constructor(public cacheSrv: CacheSaveService, private router: Router) {}

  public loadDate: string = 'not set';
  ngOnInit(): void {
    let d = new Date();
    this.loadDate = `${d.getHours()}:${d.getMinutes()}':${d.getSeconds()}"`;
  }

  onCloseBtn(item: any) {
    this.cacheSrv.removeRoute(item.route);
    if (this.cacheSrv.getTabs.length > 0) {
      this.router.navigate([
        this.cacheSrv.getTabs[this.cacheSrv.getTabs.length - 1].route,
      ]);
    } else this.router.navigate(['/']);
  }
}
