import { Router, RouterLink } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Drug } from 'src/app/models/drug.model';
import { DrugService } from 'src/app/services/drug.service';

@Component({
  selector: 'app-drug-list',
  templateUrl: './drug-list.component.html',
  styleUrls: ['./drug-list.component.css']
})
export class DrugListComponent implements OnInit {

  constructor(private drugService:DrugService,private routh:Router) { }

  druges?:Drug[];
  ngOnInit(): void {
    this.retriveAll();
  }

  retriveAll(){
    this.drugService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.druges = data;
    });
  }
  delete(drugid:any){
    this.drugService.delete(drugid).then(()=>{
      this.routh.navigateByUrl('drugs');
    });
  }
  @Output() myEvent = new EventEmitter<string>();
  edit(drug:Drug){
    this.routh.navigateByUrl('drug/'+drug.id);
  }
}
