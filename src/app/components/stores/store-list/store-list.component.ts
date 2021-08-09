import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Store } from 'src/app/models/store.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css']
})
export class StoreListComponent implements OnInit {

  constructor(private storeService:StoreService,private routh:Router) { }

  Stores:Store[]|any;
  ngOnInit(): void {
    this.retriveAll();
  }
  retriveAll(){
    this.storeService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.Stores = data;
    });
  }
  delete(storeid:any){
    this.storeService.delete(storeid).then(()=>{
      this.routh.navigateByUrl('stores');
    });
  }

  edit(store:Store){
    this.routh.navigateByUrl('store/'+store.id);
  }

}
