import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  constructor(private categoryService:CategoryService,private routh:Router) { }

  categorys?:Category[];
  ngOnInit(): void {
    this.retriveAll();
  }

  retriveAll(){
    this.categoryService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.categorys = data;
    });
  }
  delete(categoryid:any){
    this.categoryService.delete(categoryid).then(()=>{
      this.routh.navigateByUrl('category');
    });
  }
  @Output() myEvent = new EventEmitter<string>();
  edit(category:Category){
    this.routh.navigateByUrl('category/'+category.id);
  }

}
