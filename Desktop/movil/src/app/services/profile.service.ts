import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) { }

  getProfile(): Observable<any> {
    return this.auth.user.pipe(
      map(user => {
        if (user) {
          return this.firestore.collection('profiles').doc(user.uid).valueChanges();
        } else {
          return null;
        }
      })
    );
  }
}