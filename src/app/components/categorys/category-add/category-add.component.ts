import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Drug } from 'src/app/models/drug.model';
import { CategoryService } from 'src/app/services/category.service';
import { DrugService } from 'src/app/services/drug.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnInit {

  addcategoryForm:FormGroup|any;
  private newCategory:Category = new Category();
  constructor(private drugCategory:CategoryService,private routh:Router) { }

  ngOnInit(): void {
    this.addcategoryForm = new FormGroup({
      name:new FormControl('')
    })
  }
  submit(form:FormGroup){
    this.newCategory = form.value;
    this.drugCategory.create(this.newCategory);
    this.routh.navigateByUrl('category');
  }

}
