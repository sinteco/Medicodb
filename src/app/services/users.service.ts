import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private dbPath = '/Users';

  modelRef: AngularFirestoreCollection<User>;

  constructor(private db: AngularFirestore) {
    this.modelRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<User> {
    return this.modelRef;
  }
  getById(id:string): Observable<any>{
    return this.modelRef.doc(id).valueChanges();
  }

  create(drug: User): any {
    return this.modelRef.add({ ...drug });
  }

  getByEmail(email: any): AngularFirestoreCollection<User>{
    return this.db.collection(this.dbPath, ref=>ref.where('email','==',email));
  }

  update(id: string, data: any): Promise<void> {
    return this.modelRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.modelRef.doc(id).delete();
  }
}
