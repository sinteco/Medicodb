import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Drug } from '../models/drug.model';

@Injectable({
  providedIn: 'root'
})
export class DrugService {

  private dbPath = '/Drug';

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

  search(drugname: any): AngularFirestoreCollection<Drug>{
    return this.db.collection(this.dbPath, ref=>ref.where('name', '>=', drugname).where('name', '<=', drugname));
  }

  update(id: string, data: any): Promise<void> {
    return this.modelRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.modelRef.doc(id).delete();
  }
}
