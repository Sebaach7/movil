import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Entrada } from './entradas.model';
import { EntradasService } from './entradas.service';

@Component({
  selector: 'app-compra-entradas',
  templateUrl: './compra-entradas.page.html',
  styleUrls: ['./compra-entradas.page.scss'],
})
export class CompraEntradasPage implements OnInit {

  selectedEvent = '';
  ticketCount = 1;
  showSpinner = false;  // Spinner que aparece durante las operaciones
  entradas: Entrada[] = [];  // Almacena todas las entradas
  isEditing = false;  // Indica si se está editando una entrada
  editEntradaId: string | null = null;  // Almacena el ID de la entrada que se está editando
  
  constructor(private toastController: ToastController, private entradasService: EntradasService) {}

  ngOnInit() {
    this.loadEntradas();  // Leer todas las entradas cuando la página carga
  }

  // **CREAR o ACTUALIZAR** una entrada
  async comprarEntradas() {
    if (!this.selectedEvent || this.ticketCount < 1 || this.ticketCount > 10) {
      const toast = await this.toastController.create({
        message: 'Por favor, selecciona un evento y una cantidad válida de entradas (entre 1 y 10).',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    } else {
      this.showSpinner = true;  // Mostrar el spinner mientras se procesa la solicitud

      const newEntrada: Entrada = {
        id: this.editEntradaId || '',  // Si estamos editando, usamos el ID existente
        evento: this.selectedEvent,
        cantidad: this.ticketCount
      };

      try {
        if (this.isEditing) {
          // **ACTUALIZAR** una entrada
          await this.entradasService.updateEntrada(this.editEntradaId!, newEntrada);
          const toast = await this.toastController.create({
            message: `Entrada para ${this.selectedEvent} actualizada con éxito`,
            duration: 2000,
            color: 'success'
          });
          await toast.present();
        } else {
          // **CREAR** una nueva entrada
          await this.entradasService.createEntrada(newEntrada);
          const toast = await this.toastController.create({
            message: `Has comprado ${this.ticketCount} entradas para ${this.selectedEvent}`,
            duration: 2000,
            color: 'success'
          });
          await toast.present();
        }
      } catch (error) {
        const toast = await this.toastController.create({
          message: 'Error al procesar la solicitud.',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      } finally {
        this.showSpinner = false;  // Ocultar el spinner después de la operación
        this.isEditing = false;  // Terminar el modo de edición
        this.editEntradaId = null;  // Limpiar el ID de la entrada
        this.selectedEvent = '';  // Limpiar el formulario
        this.ticketCount = 1;
        this.loadEntradas();  // Recargar las entradas después de la actualización o creación
      }
    }
  }

  // **LEER** todas las entradas
  loadEntradas() {
    this.showSpinner = true;  // Mostrar el spinner al cargar las entradas
    this.entradasService.getEntradas().subscribe((data: Entrada[]) => {
      this.entradas = data;
      this.showSpinner = false;  // Ocultar el spinner después de cargar las entradas
    }, (error) => {
      console.error('Error al cargar las entradas:', error);
      this.showSpinner = false;  // Ocultar el spinner en caso de error
    });
  }

  // **ELIMINAR** una entrada
  eliminarEntrada(id: string) {
    this.showSpinner = true;  // Mostrar el spinner mientras se elimina
    this.entradasService.deleteEntrada(id).then(async () => {
      const toast = await this.toastController.create({
        message: 'Entrada eliminada con éxito.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
      this.loadEntradas();  // Recargar las entradas después de eliminar
    }).catch(async () => {
      const toast = await this.toastController.create({
        message: 'Error al eliminar la entrada.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }).finally(() => {
      this.showSpinner = false;  // Ocultar el spinner al finalizar la operación
    });
  }

  // **EDITAR** una entrada (cargar en el formulario para modificar)
  editarEntrada(entrada: Entrada) {
    this.selectedEvent = entrada.evento;
    this.ticketCount = entrada.cantidad;
    this.editEntradaId = entrada.id;  // Guardar el ID de la entrada que estamos editando
    this.isEditing = true;  // Cambiar el estado para indicar que estamos editando
  }

  // Cancelar la edición
  cancelarEdicion() {
    this.isEditing = false;
    this.editEntradaId = null;
    this.selectedEvent = '';
    this.ticketCount = 1;
  }
}