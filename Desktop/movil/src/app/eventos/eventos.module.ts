import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { EventosComponent } from './eventos.component';  // Asegúrate de que el path sea correcto

const routes: Routes = [
  {
    path: '',
    component: EventosComponent  // Ruta que carga el componente EventosComponent
  }
];

@NgModule({
  declarations: [EventosComponent],  // Declaración del componente
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes)  // Rutas específicas para este módulo
  ]
})
export class EventosModule {}