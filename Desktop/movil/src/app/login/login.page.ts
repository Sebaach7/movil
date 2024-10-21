import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';  // Asegúrate de tener el modal importado

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';
  password: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private navCtrl: NavController, 
    private toastController: ToastController, 
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {}

  async login() {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.username, this.password);
      this.showToast('Login exitoso');
      this.navCtrl.navigateRoot('/home');
    } catch (error) {
      this.showToast('Correo o contraseña incorrectos.');
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

  // Método para abrir el modal de "Olvidar Contraseña"
  async openForgotPasswordModal() {
    const modal = await this.modalCtrl.create({
      component: ModalComponent
    });
    return await modal.present();
  }
}