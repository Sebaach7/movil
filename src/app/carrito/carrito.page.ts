import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { Entrada } from '../models/entrada.model';
import { ToastController } from '@ionic/angular';  // Para mostrar mensajes de éxito o error

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  carrito: Entrada[] = [];  // El carrito con todas las entradas
  isEditing = false;  // Saber si estamos editando una entrada
  editIndex: number | null = null;  // Índice de la entrada que estamos editando
  entradaEditada: Entrada | null = null;  // Entrada que se está editando

  constructor(
    private carritoService: CarritoService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.carrito = this.carritoService.getCarrito();
  }

  // Método para eliminar una entrada del carrito
  eliminarEntrada(index: number) {
    this.carritoService.eliminarEntrada(index);
    this.mostrarToast('Entrada eliminada del carrito.', 'danger');
  }

  // Método para iniciar la edición de una entrada
  editarEntrada(index: number) {
    const entrada = this.carrito[index];
    this.isEditing = true;
    this.editIndex = index;
    this.entradaEditada = { ...entrada };  // Creamos una copia de la entrada para editar
  }

  // Método para guardar los cambios en la entrada
  guardarCambiosEntrada(entradaActualizada: Entrada) {
    if (this.editIndex !== null && this.entradaEditada !== null) {
      this.carritoService.actualizarEntrada(this.editIndex, entradaActualizada);
      this.mostrarToast('Entrada actualizada.', 'success');
      this.cancelarEdicion();
    }
  }

  // Método para cancelar la edición de una entrada
  cancelarEdicion() {
    this.isEditing = false;
    this.editIndex = null;
    this.entradaEditada = null;  // Limpiar la entrada editada
  }

  // Método para vaciar el carrito después de la compra
  comprarEntradas() {
    if (this.carrito.length > 0) {
      this.carritoService.vaciarCarrito();
      this.mostrarToast('Compra realizada con éxito.', 'success');
      this.carrito = [];  // Limpiar el carrito después de la compra
    } else {
      this.mostrarToast('El carrito está vacío.', 'danger');
    }
  }

  // Método para mostrar mensajes de Toast
  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
    });
    await toast.present();
  }
}