import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private dbPath = '/Category';

  modelRef: AngularFirestoreCollection<Category>;

  constructor(private db: AngularFirestore) {
    this.modelRef = db.collection(this.dbPath);
  }

  getAll(): AngularFirestoreCollection<Category> {
    return this.modelRef;
  }
  getById(id:string): Observable<any>{
    return this.modelRef.doc(id).valueChanges();
  }

  create(category: Category): any {
    return this.modelRef.add({ ...category });
  }

  search(name: any): AngularFirestoreCollection<Category>{
    //ref=>ref.where('name', '>=', drugname).where('name', '<=', drugname)
    return this.db.collection(this.dbPath, ref=>ref.orderBy('name').startAt(name).endAt(name+ '\uf8ff'));
  }

  update(id: string, data: any): Promise<void> {
    return this.modelRef.doc(id).update(data);
  }

  delete(id: string): Promise<void> {
    return this.modelRef.doc(id).delete();
  }
}
