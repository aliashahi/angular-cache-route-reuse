import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-module-achild-adetail',
  templateUrl: './module-achild-adetail.component.html',
  styleUrls: ['./module-achild-adetail.component.scss'],
})
export class ModuleAChildADetailComponent implements OnInit {
  public id: string = '';
  public loadDate: string = 'not set';
  constructor(activatedRoute: ActivatedRoute) {
    this.id = activatedRoute.snapshot.params['id'] || 'not found';
  }

  ngOnInit(): void {
    let d = new Date();
    this.loadDate = `${d.getHours()}:${d.getMinutes()}':${d.getSeconds()}"`;
  }
}
