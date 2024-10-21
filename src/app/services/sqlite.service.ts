import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  private dbInstance!: SQLiteObject; // Utiliza el modificador "!" para indicar que será inicializada

  constructor(private sqlite: SQLite) { }

  // Inicializar la base de datos
  initializeDatabase() {
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.dbInstance = db;
      return this.createTables();
    }).catch(e => console.log(e));
  }

  // Crear tablas
  createTables() {
    return this.dbInstance.executeSql(`
      CREATE TABLE IF NOT EXISTS entradas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        descripcion TEXT,
        precio REAL
      );
    `, []).then(() => {
      console.log('Tabla creada correctamente');
    }).catch(e => console.log(e));
  }

  // Insertar datos en la tabla
  addEntry(nombre: string, descripcion: string, precio: number) {
    return this.dbInstance.executeSql(`
      INSERT INTO entradas (nombre, descripcion, precio)
      VALUES (?, ?, ?)
    `, [nombre, descripcion, precio]).catch(e => console.log(e));
  }

  // Obtener todas las entradas
  async getEntries(): Promise<any[]> {
    try {
      const res = await this.dbInstance.executeSql('SELECT * FROM entradas', []);
      let entries: any[] = [];
      for (let i = 0; i < res.rows.length; i++) {
        entries.push(res.rows.item(i));
      }
      return entries;
    } catch (error) {
      console.error('Error al obtener entradas', error);
      return []; // Siempre devolver un array, incluso en caso de error
    }
  }
}