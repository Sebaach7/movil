import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async register() {
    if (this.password !== this.confirmPassword) {
      this.showToast('Las contraseñas no coinciden.');
      return;
    }

    try {
      await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      this.showToast('Registro exitoso');
      this.navCtrl.navigateRoot('/home');
    } catch (error) {
      this.showToast('Error en el registro.');
    }
  }

  // Método para mostrar mensajes
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'danger'
    });
    await toast.present();
  }
}