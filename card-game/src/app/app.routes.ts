import { Routes } from '@angular/router';

import { TestboardComponent } from './testboard/testboard.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/testboard',
      pathMatch: 'full',
  },
  {
    path: 'testboard',
    component: TestboardComponent,
},
];
