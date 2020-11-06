import { Routes } from '@angular/router';

import { TestboardComponent } from './testboard/testboard.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/testboard/1',
      pathMatch: 'full',
  },
  {
    path: 'testboard/:playerId',
    component: TestboardComponent,
  }
];
