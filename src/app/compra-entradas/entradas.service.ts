import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Entrada } from './entradas.model';

@Injectable({
  providedIn: 'root',
})
export class EntradasService {
  private collectionName = 'entradas';

  constructor(private firestore: AngularFirestore) {}

  createEntrada(entrada: Entrada): Promise<any> {
    return this.firestore.collection(this.collectionName).add(entrada);
  }

  getEntradas(): Observable<Entrada[]> {
    return this.firestore.collection<Entrada>(this.collectionName).valueChanges({ idField: 'id' });
  }

  updateEntrada(id: string, entrada: Partial<Entrada>): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).update(entrada);
  }

  deleteEntrada(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}