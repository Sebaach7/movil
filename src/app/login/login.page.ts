import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';  // Asegúrate de tener el modal importado

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private navCtrl: NavController, private toastController: ToastController, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.initializeLogin();
  }

  initializeLogin() {
    // Al hacer clic en el botón de login
    $('#loginForm').on('submit', (event) => {
      event.preventDefault();

      const username = $('#username').val() as string;  // Aseguramos que el valor sea de tipo string
      const password = $('#password').val() as string;  // Aseguramos que sea string

      // Validaciones con jQuery para que todos los campos estén llenos y cumplan con los requisitos
      if (!username || !password) {
        this.showToast('Por favor, completa todos los campos.');
        return;
      }

      if (!this.validatePassword(password)) {
        this.showToast('La contraseña debe tener al menos 4 números, 3 caracteres y 1 mayúscula.');
        return;
      }

      // Almacenar el nombre de usuario en localStorage (opcional)
      localStorage.setItem('username', username);
      
      // Redirigir directamente a la página Home
      this.navCtrl.navigateRoot('/home');  // Redirige a Home
    });
  }

  // Validación de la contraseña: 4 números, 3 caracteres y 1 mayúscula
  validatePassword(password: string): boolean {
    const hasFourNumbers = (password.match(/\d/g) || []).length >= 4;  // Verifica si tiene al menos 4 dígitos
    const hasThreeCharacters = (password.match(/[a-zA-Z]/g) || []).length >= 3; // Verifica si tiene al menos 3 letras
    const hasOneUppercase = /[A-Z]/.test(password);  // Verifica si tiene al menos una letra mayúscula

    return hasFourNumbers && hasThreeCharacters && hasOneUppercase;
  }

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
      component: ModalComponent  // Aquí llamamos al componente del modal
    });
    return await modal.present();
  }
}