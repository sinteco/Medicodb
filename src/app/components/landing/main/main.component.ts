import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Drug } from 'src/app/models/drug.model';
import { Store } from 'src/app/models/store.model';
import { BalanceService } from 'src/app/services/balance.service';
import { DrugService } from 'src/app/services/drug.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private drugService:DrugService,private balanceService:BalanceService, private storeService:StoreService) { }

  ngOnInit(): void {
  }

  search:any;
  druges?:Drug[];
  empty: boolean = false;
  searchResult:SearchResult[] = [];

  searchdrug(){
    this.searchResult = [];
    this.drugService.search(this.search).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.druges = data;//drug data
      let sresult = new SearchResult();
      data.forEach(element => {
        // sresult.drug = element as Drug;//set
        this.balanceService.getBydrugid(element['id']).subscribe(result=>{//balance data
          result.forEach((element: any) => {
            this.storeService.getById(element['storeid']).subscribe(value=>{//store data
              sresult.drug = element as Drug;//set drug data
              sresult.store = value;//set store data
            });
          });
        });
      });
      this.searchResult.push(sresult);
      console.log(this.searchResult);
      if (data.length === 0) {
        this.empty = true;
      } else {
        this.empty = false;
      }
    });
  }

}
export class SearchResult{
  store?:Store[]
  drug?:Drug
}
