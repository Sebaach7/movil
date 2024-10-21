import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  private apiUrl = 'https://api.stripe.com';  // URL de Stripe

  constructor(private http: HttpClient) {}

  // Método para obtener el PaymentIntent desde el backend
  retrievePaymentIntent(total: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-payment-intent`, { amount: total });
  }

  // Método para confirmar el pago
  confirmCardPayment(clientSecret: string, paymentMethod: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/confirm-payment-intent`, {
      clientSecret: clientSecret,
      paymentMethod: paymentMethod
    });
  }
}