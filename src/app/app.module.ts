import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';  // Importar IonicModule
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalComponent } from './modal/modal.component';  // Importar el componente modal

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent  // Declarar el componente modal aquí
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),  // Asegúrate de tener IonicModule
    AppRoutingModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  // Añadir CUSTOM_ELEMENTS_SCHEMA para manejar componentes personalizados
})
export class AppModule { }