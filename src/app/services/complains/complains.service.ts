import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComplainsService {
  collectionName: string = 'complaint';

  constructor(private db: AngularFirestore) {}

  getComplaint(): Observable<any[]> {
    return this.db.collection(this.collectionName).valueChanges();
  }

  addComplaint(complaint: any): void {
    console.log('complaint = ', complaint);

    const tutorialsRef = this.db.collection(this.collectionName);
    tutorialsRef.add(complaint);
  }
}
