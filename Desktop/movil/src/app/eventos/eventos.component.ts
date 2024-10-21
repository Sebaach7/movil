import { Component, OnInit } from '@angular/core';
import { EventosService } from '../services/eventos.service';  // Importa tu servicio de eventos

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
  eventos: any[] = [];  // Aquí se almacenan los eventos

  constructor(private eventosService: EventosService) {}

  ngOnInit() {
    this.obtenerEventos();
  }

  obtenerEventos() {
    this.eventosService.obtenerEventos().subscribe(
      (data: any) => {
        this.eventos = data._embedded?.events || [];
      },
      (error) => {
        console.error('Error al obtener los eventos:', error);
      }
    );
  }
}