import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Drug } from 'src/app/models/drug.model';
import { DrugService } from 'src/app/services/drug.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  adddrugForm:FormGroup|any;
  private newDrug:Drug = new Drug();
  private idparam:string|any;
  constructor(private drugService:DrugService,private routh:Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.adddrugForm = new FormGroup({
      name:new FormControl('')
    });
    this.activatedRoute.params.subscribe(paramId =>{
      this.idparam = paramId.id;
    });
    this.drugService.getById(this.idparam).subscribe(data=>{
      this.newDrug = data;
      this.adddrugForm.setValue({name:data.name});
    });
  }
  submit(form:FormGroup){
    this.newDrug = form.value;
    this.drugService.update(this.idparam,this.newDrug);
    this.routh.navigateByUrl('drugs');
  }

}
