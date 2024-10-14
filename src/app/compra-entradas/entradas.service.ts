import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';  // Asegúrate de usar 'compat' para versiones más recientes
import { Observable } from 'rxjs';
import { Entrada } from './entradas.model';


@Injectable({
  providedIn: 'root'
})
export class EntradasService {

  private collectionName = 'entradas';  // Nombre de la colección en Firebase

  constructor(private firestore: AngularFirestore) {}

  // Crear una nueva entrada
  createEntrada(entrada: Entrada): Promise<any> {
    return this.firestore.collection(this.collectionName).add(entrada);
  }

  // Leer todas las entradas
  getEntradas(): Observable<Entrada[]> {
    return this.firestore.collection<Entrada>(this.collectionName).valueChanges({ idField: 'id' });
  }

  // Actualizar una entrada
  updateEntrada(id: string, entrada: Partial<Entrada>): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).update(entrada);
  }

  // Eliminar una entrada
  deleteEntrada(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}