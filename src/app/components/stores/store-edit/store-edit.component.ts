import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from 'src/app/models/store.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store-edit',
  templateUrl: './store-edit.component.html',
  styleUrls: ['./store-edit.component.css']
})
export class StoreEditComponent implements OnInit {

  addstoreForm:FormGroup|any;
  private newStore:Store = new Store();
  private idparam:string|any;
  constructor(private storeService:StoreService,private routh:Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.addstoreForm = new FormGroup({
      name:new FormControl(''),
      latitude:new FormControl(''),
      longitude:new FormControl('')
    });
    this.activatedRoute.params.subscribe(paramId =>{
      this.idparam = paramId.id;
    });
    this.storeService.getById(this.idparam).subscribe(data=>{
      this.newStore = data;
      this.addstoreForm.setValue(
        {
          name:data.name,
          latitude:data.latitude,
          longitude:data.longitude
        });
    });
  }
  submit(form:FormGroup){
    this.newStore = form.value;
    this.storeService.update(this.idparam,this.newStore);
    this.routh.navigateByUrl('stores');
  }

}
