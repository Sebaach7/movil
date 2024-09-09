import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(private navCtrl: NavController) {}

  // Método para redirigir a la página de login
  navigateToLogin() {
    this.navCtrl.navigateForward('/login');  // Redirige a la página de login
  }

}