import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'compra-entradas',
    loadChildren: () => import('./compra-entradas/compra-entradas.module').then(m => m.CompraEntradasPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./carrito/carrito.module').then(m => m.CarritoPageModule)
  },
  {
    path: 'confirmacion-pago',
    loadChildren: () => import('./confirmacion-pago/confirmacion-pago.module').then(m => m.ConfirmacionPagoPageModule)
  },
  {
    path: 'eventos',  // Nueva ruta para eventos
    loadChildren: () => import('./eventos/eventos.module').then(m => m.EventosModule)  // Asegúrate de usar EventosModule
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}