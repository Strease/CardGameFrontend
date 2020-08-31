import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';
import { TestboardComponent } from './testboard/testboard.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full',
  },
  {
      path: 'home',
      component: HomeComponent,
  },
  {
    path: 'testboard',
    component: TestboardComponent,
},
];
