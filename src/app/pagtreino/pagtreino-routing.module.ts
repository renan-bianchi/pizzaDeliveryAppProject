import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagtreinoPage } from './pagtreino.page';

const routes: Routes = [
  {
    path: '',
    component: PagtreinoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagtreinoPageRoutingModule {}
