import { Component, OnInit, ViewChild } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { Entrada } from '../models/entrada.model';
import { StripeService } from '../services/stripe.service';
import { StripeCardComponent } from 'ngx-stripe';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-confirmacion-pago',
  templateUrl: './confirmacion-pago.page.html',
  styleUrls: ['./confirmacion-pago.page.scss'],
})
export class ConfirmacionPagoPage implements OnInit {
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;  // Utiliza el operador ! para indicar que Angular inicializará este campo

  carrito: Entrada[] = [];
  totalCompra: number = 0;
  clientSecret: string | undefined;
  error: any;

  constructor(
    private carritoService: CarritoService,
    private stripeService: StripeService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.carrito = this.carritoService.getCarrito();
    this.calcularTotal();
    this.crearPaymentIntent();
  }

  calcularTotal() {
    this.totalCompra = this.carrito.reduce((total, entrada) => total + entrada.precio, 0);
  }

  crearPaymentIntent() {
    this.stripeService.retrievePaymentIntent(this.totalCompra.toString()).subscribe(
      (result: any) => {
        this.clientSecret = result.clientSecret;
      },
      (error: any) => {
        console.error('Error al crear PaymentIntent:', error);
      }
    );
  }

  confirmarPago() {
    if (!this.clientSecret) {
      console.error('Client secret no definido');
      return;
    }

    this.stripeService.confirmCardPayment(this.clientSecret, {
      payment_method: {
        card: this.card.element,  // Asegúrate de que `card` esté correctamente definido
      },
    }).subscribe(result => {
      if (result.error) {
        this.error = result.error.message;
      } else {
        alert('¡Pago confirmado! Gracias por tu compra.');
      }
    });
  }
}