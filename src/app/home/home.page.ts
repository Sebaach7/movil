import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';  // Importa NavController para la navegación

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl: NavController) {}

  // Función para redirigir a la página de login
  goToLogin() {
    this.navCtrl.navigateForward('/login');
  }
}