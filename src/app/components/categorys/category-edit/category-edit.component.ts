import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  addCategoryForm:FormGroup|any;
  private newCategory:Category = new Category();
  private idparam:string|any;
  constructor(private categoryService:CategoryService,private routh:Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.addCategoryForm = new FormGroup({
      name:new FormControl('')
    });
    this.activatedRoute.params.subscribe(paramId =>{
      this.idparam = paramId.id;
    });
    this.categoryService.getById(this.idparam).subscribe(data=>{
      this.newCategory = data;
      this.addCategoryForm.setValue({name:data.name});
    });
  }
  submit(form:FormGroup){
    this.newCategory = form.value;
    this.categoryService.update(this.idparam,this.newCategory);
    this.routh.navigateByUrl('category');
  }

}
