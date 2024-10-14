import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketmasterService {

  private apiKey = 'r2mBp1TCQpSldam9qxGeCO91U4qiucXp';  // Tu API Key de Ticketmaster
  private apiUrl = 'https://app.ticketmaster.com/discovery/v2/';

  constructor(private http: HttpClient) { }

  // Método para obtener eventos
  getEventos(): Observable<any> {
    const url = `${this.apiUrl}events.json?apikey=${this.apiKey}`;
    return this.http.get(url);
  }

  // Método para buscar un evento específico por palabra clave
  buscarEventos(keyword: string): Observable<any> {
    const url = `${this.apiUrl}events.json?apikey=${this.apiKey}&keyword=${keyword}`;
    return this.http.get(url);
  }
}