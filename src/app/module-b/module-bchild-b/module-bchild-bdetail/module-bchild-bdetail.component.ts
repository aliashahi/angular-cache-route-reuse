import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-module-bchild-bdetail',
  templateUrl: './module-bchild-bdetail.component.html',
  styleUrls: ['./module-bchild-bdetail.component.scss'],
})
export class ModuleBChildBDetailComponent implements OnInit {
  public id: string = '';
  constructor(activatedRoute: ActivatedRoute) {
    this.id = activatedRoute.snapshot.params['id'] || 'not found';
  }
  
  public loadDate: string = 'not set';
  ngOnInit(): void {
    let d = new Date();
    this.loadDate = `${d.getHours()}:${d.getMinutes()}':${d.getSeconds()}"`;
  }
}
