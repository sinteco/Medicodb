import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Balance } from '../models/balance.model';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  private dbPath = '/Balance';

  modelRef: AngularFirestoreCollection<Balance>;

  constructor(private db: AngularFirestore) {
    this.modelRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Balance> {
    return this.modelRef;
  }
  getById(id:string): Observable<any>{
    return this.modelRef.doc(id).valueChanges();
  }
  getBydrugid(id:string): Observable<any>{
    return this.db.collection(this.dbPath, ref=>ref.where('drugid','==',id)).valueChanges();
  }
  getBystoreid(id:string): Observable<any>{
    return this.db.collection(this.dbPath, ref=>ref.where('storeid','==',id)).valueChanges();
  }

  create(drug: Balance): any {
    return this.modelRef.add({ ...drug });
  }

  update(id: string, data: any): Promise<void> {
    return this.modelRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.modelRef.doc(id).delete();
  }
}
