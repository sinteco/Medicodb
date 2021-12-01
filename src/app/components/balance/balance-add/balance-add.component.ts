import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Balance } from 'src/app/models/balance.model';
import { Drug } from 'src/app/models/drug.model';
import { Store } from 'src/app/models/store.model';
import { BalanceService } from 'src/app/services/balance.service';
import { DrugService } from 'src/app/services/drug.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-balance-add',
  templateUrl: './balance-add.component.html',
  styleUrls: ['./balance-add.component.css']
})
export class BalanceAddComponent implements OnInit {

  balances?:Balance[];
  druges?:Drug[];
  stores?:Store[];
  addbalanceForm:FormGroup|any;
  private newBalance:Balance = new Balance();
  public sessionresult:string|any;
  constructor(private balanceService:BalanceService,private routh:Router,private drugService: DrugService,private storeService:StoreService) { }

  ngOnInit(): void {
    this.addbalanceForm = new FormGroup({
      drugid:new FormControl(''),
      storeid:new FormControl('')
    });
    this.retriveAll();
  }
  submit(form:FormGroup){
    this.newBalance = form.value;
    this.balanceService.create(this.newBalance);
    this.routh.navigateByUrl('balance');
  }
  checkSession(){
    this.sessionresult = sessionStorage.getItem('you have the privilage @medicodb');
    if(this.sessionresult=="privilage@medicodb")
      this.sessionresult = true;
    else
      this.sessionresult = false;
  }
  retriveAll(){
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

}
