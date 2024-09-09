import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-compra-entradas',
  templateUrl: './compra-entradas.page.html',
  styleUrls: ['./compra-entradas.page.scss'],
})
export class CompraEntradasPage {

  selectedEvent = '';  // Evento seleccionado
  ticketCount = 1;  // Cantidad de entradas por defecto
  showSpinner = false;  // Controla el spinner

  constructor(private toastController: ToastController) {}

  async comprarEntradas() {
    if (!this.selectedEvent || this.ticketCount < 1 || this.ticketCount > 10) {
      const toast = await this.toastController.create({
        message: 'Por favor, selecciona un evento y una cantidad válida de entradas (entre 1 y 10).',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    } else {
      // Mostrar el spinner de "cargando"
      this.showSpinner = true;

      // Simular el proceso de compra con un retraso
      setTimeout(async () => {
        const toast = await this.toastController.create({
          message: `Has comprado ${this.ticketCount} entradas para ${this.selectedEvent}`,
          duration: 2000,
          color: 'success'
        });
        await toast.present();

        // Ocultar el spinner después de la simulación
        this.showSpinner = false;
      }, 2000);  // Retraso de 2 segundos para simular la compra
    }
  }
}