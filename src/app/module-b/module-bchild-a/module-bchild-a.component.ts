import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-module-bchild-a',
  templateUrl: './module-bchild-a.component.html',
  styleUrls: ['./module-bchild-a.component.scss'],
})
export class ModuleBChildAComponent implements OnInit {
  constructor() {}

  public loadDate: string = 'not set';
  ngOnInit(): void {
    let d = new Date();
    this.loadDate = `${d.getHours()}:${d.getMinutes()}':${d.getSeconds()}"`;
  }
}
