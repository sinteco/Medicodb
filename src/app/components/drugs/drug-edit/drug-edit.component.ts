import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/models/category.model';
import { Drug } from 'src/app/models/drug.model';
import { CategoryService } from 'src/app/services/category.service';
import { DrugService } from 'src/app/services/drug.service';

@Component({
  selector: 'app-drug-edit',
  templateUrl: './drug-edit.component.html',
  styleUrls: ['./drug-edit.component.css']
})
export class DrugEditComponent implements OnInit {

  adddrugForm:FormGroup|any;
  private newDrug:Drug = new Drug();
  private idparam:string|any;
  categorys?:Category[];
  constructor(private drugService:DrugService,private categoryService:CategoryService,private routh:Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.adddrugForm = new FormGroup({
      name:new FormControl(''),
      categoryid:new FormControl('')
    });
    this.activatedRoute.params.subscribe(paramId =>{
      this.idparam = paramId.id;
    });
    this.drugService.getById(this.idparam).subscribe(data=>{
      this.newDrug = data;
      this.adddrugForm.setValue({name:data.name,categoryid:data.categoryid});
    });
    this.retriveAll();
  }
  submit(form:FormGroup){
    this.newDrug = form.value;
    this.drugService.update(this.idparam,this.newDrug);
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
