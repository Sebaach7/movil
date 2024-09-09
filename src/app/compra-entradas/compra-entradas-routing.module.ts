import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompraEntradasPage } from './compra-entradas.page';

const routes: Routes = [
  {
    path: '',
    component: CompraEntradasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompraEntradasPageRoutingModule {}
