import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: string | null = '';  // Permitir que sea nulo inicialmente

  constructor() {}

  ngOnInit() {
    this.loadUsername();
  }

  // Método para cargar el nombre del usuario desde localStorage
  loadUsername() {
    const storedUsername = localStorage.getItem('username');
    this.username = storedUsername ? storedUsername : 'Invitado';  // Si es null, mostrar 'Invitado'
  }
}