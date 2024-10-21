import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private toastCtrl: ToastController) {}

  ngOnInit() {
    $(document).ready(() => {
      // Validación y envío del formulario cuando se hace clic en el botón de enviar
      $('#submitEmailBtn').on('click', async (event: Event) => {
        event.preventDefault();

        let isValid = true;

        // Validación del email
        const email = $('#email').val() as string;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
          isValid = false;
          $('#emailError').show();  // Mostrar mensaje de error si el email no es válido
        } else {
          $('#emailError').hide();  // Ocultar mensaje de error si el email es válido
        }

        if (isValid) {
          // Mostrar el toast de éxito
          const toast = await this.toastCtrl.create({
            message: '¡El correo fue enviado correctamente!',
            duration: 3000,  // Duración de 3 segundos
            color: 'success'
          });
          await toast.present();

          // Cerrar el modal después del envío
          this.confirmar(email);
        }
      });

      // Manejar el cierre del modal al hacer clic en "Cancelar"
      $('#cancelarBtn').on('click', () => {
        this.cancelar();
      });
    });
  }

  // Función para cerrar el modal
  cancelar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  // Función para confirmar el correo y cerrar el modal
  confirmar(email: string) {
    this.modalCtrl.dismiss({ email }, 'confirm');
  }
}