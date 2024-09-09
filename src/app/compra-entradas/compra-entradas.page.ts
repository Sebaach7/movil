import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-compra-entradas',
  templateUrl: './compra-entradas.page.html',
  styleUrls: ['./compra-entradas.page.scss'],
})
export class CompraEntradasPage implements OnInit {

  constructor(private toastController: ToastController) { }

  ngOnInit() {
    $(document).ready(() => {
      $('#buyTicketBtn').on('click', async (event: Event) => {
        event.preventDefault();

        const selectedEvent = $('#eventSelect').val() as string;
        const ticketCount = $('#ticketCount').val() as string;

        if (!selectedEvent || !ticketCount || parseInt(ticketCount) < 1) {
          const toast = await this.toastController.create({
            message: 'Por favor, selecciona un evento y una cantidad válida de entradas.',
            duration: 2000,
            color: 'danger'
          });
          await toast.present();
        } else {
          // Mostrar el spinner (animación) de Ionic
          $('#spinner').show();

          // Simular una compra de entradas
          setTimeout(async () => {
            const toast = await this.toastController.create({
              message: `Has comprado ${ticketCount} entradas para ${selectedEvent}`,
              duration: 2000,
              color: 'success'
            });
            await toast.present();

            // Ocultar el spinner después de la simulación
            $('#spinner').hide();
          }, 2000);  // Simula un retraso de 2 segundos
        }
      });
    });
  }
}