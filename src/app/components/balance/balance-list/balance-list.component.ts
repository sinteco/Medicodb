import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Balance } from 'src/app/models/balance.model';
import { Drug } from 'src/app/models/drug.model';
import { Store } from 'src/app/models/store.model';
import { BalanceService } from 'src/app/services/balance.service';
import { DrugService } from 'src/app/services/drug.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-balance-list',
  templateUrl: './balance-list.component.html',
  styleUrls: ['./balance-list.component.css']
})
export class BalanceListComponent implements OnInit {

  constructor(private balanceService:BalanceService,private routh:Router,private drugService:DrugService,private storeService:StoreService) { }

  balances?:Balance[];
  druges?:Drug[];
  stores?:Store[];
  ngOnInit(): void {
    this.retriveAll();
  }

  retriveAll(){
    this.balanceService.getAll().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.balances = data;
    });
    this.drugService.getAll().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.druges = data;
    });
    this.storeService.getAll().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.stores = data;
    });
  }
  getDrug(drugid:any){
    let drug = this.druges?.filter(drug=>drug.id===drugid)[0]['name'];
    return drug;
  }
  getStore(storeid:any){
    let store = this.stores?.filter(store=>store.id===storeid)[0]['name'];
    return store;
  }
  delete(balanceid:any){
    this.balanceService.delete(balanceid).then(()=>{
      this.routh.navigateByUrl('balance');
    });
  }
  @Output() myEvent = new EventEmitter<string>();
  edit(drug:Balance){
    this.routh.navigateByUrl('balance/'+drug.id);
  }

}
