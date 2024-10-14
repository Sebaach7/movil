import { Injectable } from '@angular/core';
import { Entrada } from '../models/entrada.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: Entrada[] = [];

  getCarrito(): Entrada[] {
    return this.carrito;
  }

  agregarEntrada(entrada: Entrada) {
    this.carrito.push(entrada);
  }

  eliminarEntrada(index: number) {
    this.carrito.splice(index, 1);
  }

  actualizarEntrada(index: number, entradaActualizada: Entrada) {
    this.carrito[index] = entradaActualizada;
  }

  vaciarCarrito() {
    this.carrito = [];
  }

  // Este es el método que necesitas para la confirmación de la compra
  comprarEntradas() {
    // Aquí puedes agregar lógica para realizar el proceso de pago
    console.log('Compra realizada con éxito.');
    this.vaciarCarrito(); // Vaciar el carrito después de la compra
  }
}