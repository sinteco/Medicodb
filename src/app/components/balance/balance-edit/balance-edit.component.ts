import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Balance } from 'src/app/models/balance.model';
import { Drug } from 'src/app/models/drug.model';
import { Store } from 'src/app/models/store.model';
import { BalanceService } from 'src/app/services/balance.service';
import { DrugService } from 'src/app/services/drug.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-balance-edit',
  templateUrl: './balance-edit.component.html',
  styleUrls: ['./balance-edit.component.css']
})
export class BalanceEditComponent implements OnInit {

  addbalanceForm:FormGroup|any;
  druges?:Drug[];
  stores?:Store[];
  private newBalance:Balance = new Balance();
  private idparam:string|any;
  constructor(private balanceService:BalanceService,private routh:Router,private activatedRoute: ActivatedRoute,private drugService:DrugService,private storeService:StoreService) { }

  ngOnInit(): void {
    this.addbalanceForm = new FormGroup({
      drugid:new FormControl(''),
      storeid:new FormControl('')
    });
    this.activatedRoute.params.subscribe(paramId =>{
      this.idparam = paramId.id;
    });
    this.balanceService.getById(this.idparam).subscribe(data=>{
      this.newBalance = data;
      this.addbalanceForm.setValue({storeid:data.storeid,drugid:data.drugid});
    });
    this.retriveAll();
  }
  submit(form:FormGroup){
    this.newBalance = form.value;
    this.balanceService.update(this.idparam,this.newBalance);
    this.routh.navigateByUrl('balance');
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
      console.log(data);
    });
  }

}
