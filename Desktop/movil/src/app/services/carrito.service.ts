import { Injectable } from '@angular/core';
import { Entrada } from '../models/entrada.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: Entrada[] = [];

  constructor() {}

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
    if (index >= 0 && index < this.carrito.length) {
      this.carrito[index] = entradaActualizada;
    }
  }

  vaciarCarrito() {
    this.carrito = [];
  }
}