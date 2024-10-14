import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private apiKey = 'XimVFfDCcgGs6oQO6wJ0F8r5RBfwMHVc';  // Asegúrate de usar tu API Key
  private apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${this.apiKey}`;

  constructor(private http: HttpClient) {}

  obtenerEventos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}