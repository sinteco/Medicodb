import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Drug } from 'src/app/models/drug.model';
import { DrugService } from 'src/app/services/drug.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private drugService:DrugService) { }

  ngOnInit(): void {
  }

  search:any;
  druges?:Drug[];

  searchdrug(){
    this.drugService.search(this.search).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.druges = data;
    });
  }

}
