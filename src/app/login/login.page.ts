import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  users = [
    { username: 'user1', password: 'password1A' },
    { username: 'user2', password: 'Password123' }
  ];

  constructor(private navCtrl: NavController, private toastController: ToastController) {}

  ngOnInit() {
    this.initializeLogin();
  }

  initializeLogin() {
    // Validar el formulario con jQuery al hacer clic en el botón de login
    $('#loginForm').on('submit', (event) => {
      event.preventDefault();

      const username = $('#username').val() as string;  // Aseguramos que el valor sea de tipo string
      const password = $('#password').val() as string;  // Forzamos que sea string

      if (!this.validatePassword(password)) {
        this.showToast('La contraseña debe tener al menos 4 números, 3 caracteres y 1 mayúscula.');
        return;
      }

      const user = this.users.find(u => u.username === username && u.password === password);

      if (user) {
        // Almacenar el nombre de usuario en localStorage
        localStorage.setItem('username', username);
        
        // Redirigir al home
        this.navCtrl.navigateRoot('/home');
      } else {
        this.showToast('Usuario o contraseña incorrecta');
      }
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
}