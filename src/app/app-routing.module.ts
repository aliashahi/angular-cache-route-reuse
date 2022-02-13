import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppContainer } from './app.container';

const routes: Routes = [
  {
    path: '',
    component: AppContainer,
    children: [
      {
        path: 'module-a',
        loadChildren: () =>
          import('./module-a/module-a.module').then((m) => m.ModuleAModule),
      },
      {
        path: 'module-b',
        loadChildren: () =>
          import('./module-b/module-b.module').then((m) => m.ModuleBModule),
      },
      {
        path: '**',
        redirectTo: 'module-a',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
