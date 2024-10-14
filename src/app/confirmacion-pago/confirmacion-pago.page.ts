import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { Entrada } from '../models/entrada.model';

@Component({
  selector: 'app-confirmacion-pago',
  templateUrl: './confirmacion-pago.page.html',
  styleUrls: ['./confirmacion-pago.page.scss'],
})
export class ConfirmacionPagoPage implements OnInit {
  carrito: Entrada[] = [];
  totalCompra: number = 0;

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.carrito = this.carritoService.getCarrito();
    this.calcularTotal();
  }

  // Calcular el precio total de la compra
  calcularTotal() {
    this.totalCompra = this.carrito.reduce((total, entrada) => total + entrada.precio, 0);
  }

  // Confirmar el pago
  confirmarPago() {
    alert('¡Pago confirmado! Gracias por tu compra.');
    this.carritoService.comprarEntradas();  // Vaciar el carrito después del pago
  }
}