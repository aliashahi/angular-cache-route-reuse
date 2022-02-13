import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleBChildBComponent } from './module-bchild-b/module-bchild-b.component';
import { ModuleBChildAComponent } from './module-bchild-a/module-bchild-a.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleBContainer } from './module-b.container';

const routes: Routes = [
  {
    path: '',
    component: ModuleBContainer,
    children: [
      {
        path: 'child-a',
        component: ModuleBChildAComponent,
      },
      {
        path: 'child-b',
        component: ModuleBChildBComponent,
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
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ModuleBModule {}
