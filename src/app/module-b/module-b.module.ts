import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleBChildBComponent } from './module-bchild-b/module-bchild-b.component';
import { ModuleBChildAComponent } from './module-bchild-a/module-bchild-a.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleBContainer } from './module-b.container';
import { ModuleBChildBDetailComponent } from './module-bchild-b/module-bchild-bdetail/module-bchild-bdetail.component';

const routes: Routes = [
  {
    path: '',
    component: ModuleBContainer,
    children: [
      {
        path: 'child-a',
        component: ModuleBChildAComponent,
        data: {
          title: 'Module B : Child A',
        },
      },
      {
        path: 'child-b',
        component: ModuleBChildBComponent,
        data: {
          title: 'Module B : Child B',
        },
      },
      {
        path: 'child-b/:id',
        component: ModuleBChildBDetailComponent,
        data: {
          title: 'Module B : Child B item',
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
    ModuleBContainer,
    ModuleBChildBComponent,
    ModuleBChildAComponent,
    ModuleBChildBDetailComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ModuleBModule {}
