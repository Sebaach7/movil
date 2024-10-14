import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  // Asegúrate de importar esto

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalComponent } from './modal/modal.component';

// Firebase imports
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';  // Importar AngularFirestoreModule
import { environment } from '../environments/environment';

// Stripe imports
import { NgxStripeModule } from 'ngx-stripe';  // Importar NgxStripeModule

// Servicios
import { EntradasService } from './compra-entradas/entradas.service';
import { EventosService } from './services/eventos.service'; // Importar el servicio de eventos

@NgModule({
  declarations: [
    AppComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,  // Importar HttpClientModule para hacer peticiones HTTP
    AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializar Firebase
    AngularFireAuthModule, // Módulo de autenticación Firebase
    AngularFirestoreModule, // Módulo Firestore
    NgxStripeModule.forRoot('sk_test_51Q9vZWRvQIl6GZuTVdIqYnAvUmVoqD3zefL8zF5slTexosAchesafCeeGP2alUe4XPehAecdADjM4sK1LFKirHYv00J8lnd1Wy')  // Clave pública de Stripe
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    EntradasService, // Asegúrate de registrar los servicios aquí
    EventosService // Añadir el servicio de eventos
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }