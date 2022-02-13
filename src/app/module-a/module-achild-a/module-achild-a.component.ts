import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-module-achild-a',
  templateUrl: './module-achild-a.component.html',
  styleUrls: ['./module-achild-a.component.scss'],
})
export class ModuleAChildAComponent implements OnInit {
  constructor() {}

  public loadDate: string = 'not set';
  ngOnInit(): void {
    let d = new Date();
    this.loadDate = `${d.getHours()}:${d.getMinutes()}':${d.getSeconds()}"`;
  }
}
