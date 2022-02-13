import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleAChildAComponent } from './module-achild-a/module-achild-a.component';
import { ModuleAChildBComponent } from './module-achild-b/module-achild-b.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleAContainer } from './module-a.container';
import { ModuleAChildADetailComponent } from './module-achild-a/module-achild-adetail/module-achild-adetail.component';

const routes: Routes = [
  {
    path: '',
    component: ModuleAContainer,
    children: [
      {
        path: 'child-a',
        component: ModuleAChildAComponent,
        data: {
          title: 'Module A : Child A',
        },
      },
      {
        path: 'child-a/:id',
        component: ModuleAChildADetailComponent,
        data: {
          title: 'Module A : Child A item',
        },
      },
      {
        path: 'child-b',
        component: ModuleAChildBComponent,
        data: {
          title: 'Module A : Child B',
        },
      },
      {
        path: '**',
        redirectTo: 'child-a',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  declarations: [
    ModuleAContainer,
    ModuleAChildAComponent,
    ModuleAChildBComponent,
    ModuleAChildADetailComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ModuleAModule {}
