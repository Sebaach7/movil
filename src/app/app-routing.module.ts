import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'compra-entradas',
    loadChildren: () => import('./compra-entradas/compra-entradas.module').then( m => m.CompraEntradasPageModule)  // Añadir la ruta de compra-entradas
  },
  // Si tienes más rutas puedes agregarlas aquí
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })  // Esto se asegura de que las rutas se carguen con la estrategia de precarga
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }