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
  descripcion = '';  // Descripción del evento
  precioUnitario = 0;  // Precio por entrada
  precioTotal = 0;  // Precio total por evento seleccionado
  carrito: Entrada[] = [];  // Carrito de compras con múltiples entradas
  showSpinner = false;
  entradas: Entrada[] = [];  // Array para almacenar las entradas del servidor
  isEditing = false;  // Indica si estamos editando una entrada
  editEntradaId: string | null = null;  // Almacenar el ID de la entrada que estamos editando
  
  constructor(private toastController: ToastController, private entradasService: EntradasService) {}

  ngOnInit() {
    this.loadEntradas();  // Cargar las entradas desde Firebase cuando la página cargue
  }

  // Cargar detalles según el evento seleccionado
  setEventoDetalles() {
    switch (this.selectedEvent) {
      case 'radiohead':
        this.descripcion = "Sumérgete en una experiencia inolvidable con los sonidos envolventes y experimentales de Radiohead.";
        this.precioUnitario = 75000;
        break;
      case 'thestrokes':
        this.descripcion = "Prepárate para una noche llena de energía y rock con The Strokes.";
        this.precioUnitario = 55000;
        break;
      case 'jeffbuckley':
        this.descripcion = "Disfruta de las baladas emotivas y la voz inigualable de Jeff Buckley.";
        this.precioUnitario = 60000;
        break;
      default:
        this.descripcion = '';
        this.precioUnitario = 0;
        break;
    }
    this.calcularPrecioTotal();  // Calcular el precio total por el evento seleccionado
  }

  // Calcular el precio total por evento seleccionado
  calcularPrecioTotal() {
    this.precioTotal = this.precioUnitario * this.ticketCount;
  }

  // Agregar la entrada seleccionada al carrito
  agregarAlCarrito() {
    if (!this.selectedEvent || this.ticketCount < 1 || this.ticketCount > 10 || this.precioUnitario <= 0) {
      this.mostrarToast('Por favor, selecciona un evento, una cantidad válida de entradas y un precio.', 'danger');
    } else {
      const nuevaEntrada: Entrada = {
        id: this.editEntradaId || '',  // ID temporal hasta que se guarde en Firebase
        evento: this.selectedEvent,
        cantidad: this.ticketCount,
        descripcion: this.descripcion,
        precio: this.precioTotal  // Precio total para la cantidad seleccionada
      };

      // Verificar si ya existe una entrada del mismo evento en el carrito
      const entradaExistente = this.carrito.find(entrada => entrada.evento === this.selectedEvent);

      if (entradaExistente) {
        // Si ya existe, actualizamos la cantidad y el precio total
        entradaExistente.cantidad += this.ticketCount;
        entradaExistente.precio += this.precioTotal;
      } else {
        // Si no existe, agregamos la nueva entrada al carrito
        this.carrito.push(nuevaEntrada);
      }

      // Limpiar el formulario
      this.selectedEvent = '';
      this.ticketCount = 1;
      this.descripcion = '';
      this.precioUnitario = 0;
      this.precioTotal = 0;
    }
  }

  // Guardar todas las entradas del carrito en Firebase
  async comprarEntradas() {
    if (this.carrito.length === 0) {
      this.mostrarToast('El carrito está vacío.', 'danger');
      return;
    }

    this.showSpinner = true;

    try {
      for (const entrada of this.carrito) {
        if (entrada.id) {
          // Si ya tiene un ID, estamos editando la entrada
          await this.entradasService.updateEntrada(entrada.id, entrada);
        } else {
          // Si no tiene un ID, creamos una nueva entrada
          await this.entradasService.createEntrada(entrada);
        }
      }
      this.mostrarToast('Entradas compradas con éxito.', 'success');
    } catch (error) {
      this.mostrarToast('Error al procesar la solicitud.', 'danger');
    } finally {
      this.showSpinner = false;
      this.carrito = [];  // Vaciar el carrito después de la compra
      this.loadEntradas();  // Recargar las entradas
    }
  }

  // Mostrar un mensaje de toast
  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color
    });
    await toast.present();
  }

  // Cargar todas las entradas desde Firebase
  loadEntradas() {
    this.showSpinner = true;
    this.entradasService.getEntradas().subscribe((data: Entrada[]) => {
      this.entradas = data;
      this.showSpinner = false;
    }, (error) => {
      this.showSpinner = false;
      console.error('Error al cargar las entradas:', error);
    });
  }

  // Editar una entrada del carrito
  editarEntradaCarrito(entrada: Entrada) {
    this.selectedEvent = entrada.evento;
    this.ticketCount = entrada.cantidad;
    this.descripcion = entrada.descripcion;
    this.precioUnitario = entrada.precio / entrada.cantidad;  // Precio unitario
    this.precioTotal = entrada.precio;
    this.editEntradaId = entrada.id;
    this.isEditing = true;
  }

  // Eliminar una entrada del carrito
  eliminarEntradaCarrito(index: number) {
    this.carrito.splice(index, 1);
  }

  // Cancelar la edición
  cancelarEdicion() {
    this.isEditing = false;
    this.editEntradaId = null;
    this.selectedEvent = '';
    this.ticketCount = 1;
    this.descripcion = '';
    this.precioUnitario = 0;
    this.precioTotal = 0;
  }
}