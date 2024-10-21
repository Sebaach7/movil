import { Component, OnInit } from '@angular/core';
import { SqliteService } from '../services/sqlite.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  entradas: any[] = [];

  constructor(private sqliteService: SqliteService) {}

  ngOnInit() {
    this.sqliteService.initializeDatabase().then(() => {
      this.loadEntries();
    });
  }

  loadEntries() {
    this.sqliteService.getEntries().then(data => {
      this.entradas = data;
    });
  }

  addEntry() {
    this.sqliteService.addEntry('Concierto Radiohead', 'Gran concierto', 50000).then(() => {
      this.loadEntries();
    });
  }
}