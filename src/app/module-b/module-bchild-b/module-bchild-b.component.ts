import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-module-bchild-b',
  templateUrl: './module-bchild-b.component.html',
  styleUrls: ['./module-bchild-b.component.scss']
})
export class ModuleBChildBComponent implements OnInit {

  constructor() { }

  public loadDate: string = 'not set';
  ngOnInit(): void {
    let d = new Date();
    this.loadDate = `${d.getHours()}:${d.getMinutes()}':${d.getSeconds()}"`;
  }

}
