import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Drug } from '../models/drug.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private dbPath = '/Stores';

  modelRef: AngularFirestoreCollection<Drug>;

  constructor(private db: AngularFirestore) {
    this.modelRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Drug> {
    return this.modelRef;
  }
  getById(id:string): Observable<any>{
    return this.modelRef.doc(id).valueChanges();
  }

  create(drug: Drug): any {
    return this.modelRef.add({ ...drug });
  }

  update(id: string, data: any): Promise<void> {
    return this.modelRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.modelRef.doc(id).delete();
  }
}
