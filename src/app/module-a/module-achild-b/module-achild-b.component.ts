import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-module-achild-b',
  templateUrl: './module-achild-b.component.html',
  styleUrls: ['./module-achild-b.component.scss'],
})
export class ModuleAChildBComponent implements OnInit {
  constructor() {}

  public loadDate: string = 'not set';
  ngOnInit(): void {
    let d = new Date();
    this.loadDate = `${d.getHours()}:${d.getMinutes()}':${d.getSeconds()}"`;
  }
}
