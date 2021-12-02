import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/models/category.model';
import { Drug } from 'src/app/models/drug.model';
import { CategoryService } from 'src/app/services/category.service';
import { DrugService } from 'src/app/services/drug.service';

@Component({
  selector: 'app-drug-add',
  templateUrl: './drug-add.component.html',
  styleUrls: ['./drug-add.component.css']
})
export class DrugAddComponent implements OnInit {

  adddrugForm:FormGroup|any;
  private newDrug:Drug = new Drug();
  categorys?:Category[];
  constructor(private drugService:DrugService,private categoryService: CategoryService,private routh:Router) { }

  ngOnInit(): void {
    this.adddrugForm = new FormGroup({
      name:new FormControl(''),
      categoryid:new FormControl('')
    });
    this.retriveAll();
  }
  submit(form:FormGroup){
    this.newDrug = form.value;
    this.drugService.create(this.newDrug);
    this.routh.navigateByUrl('drugs');
  }
  retriveAll(){
    //category
    this.categoryService.getAll().snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.categorys = data;
    });
  }

}
