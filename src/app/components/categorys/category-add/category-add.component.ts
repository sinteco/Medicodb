import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Drug } from 'src/app/models/drug.model';
import { DrugService } from 'src/app/services/drug.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  adddrugForm:FormGroup|any;
  private newDrug:Drug = new Drug();
  constructor(private drugService:DrugService,private routh:Router) { }

  ngOnInit(): void {
    this.adddrugForm = new FormGroup({
      name:new FormControl('')
    })
  }
  submit(form:FormGroup){
    this.newDrug = form.value;
    this.drugService.create(this.newDrug);
    this.routh.navigateByUrl('drugs');
  }

}
