import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleAChildAComponent } from './module-achild-a/module-achild-a.component';
import { ModuleAChildBComponent } from './module-achild-b/module-achild-b.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleAContainer } from './module-a.container';

const routes: Routes = [
  {
    path: '',
    component: ModuleAContainer,
    children: [
      {
        path: 'child-a',
        component: ModuleAChildAComponent,
      },
      {
        path: 'child-b',
        component: ModuleAChildBComponent,
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
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ModuleAModule {}
