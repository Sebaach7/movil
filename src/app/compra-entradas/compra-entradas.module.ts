import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompraEntradasPageRoutingModule } from './compra-entradas-routing.module';

import { CompraEntradasPage } from './compra-entradas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompraEntradasPageRoutingModule
  ],
  declarations: [CompraEntradasPage]
})
export class CompraEntradasPageModule {}
