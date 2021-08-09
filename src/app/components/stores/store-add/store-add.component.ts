import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from 'src/app/models/store.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store-add',
  templateUrl: './store-add.component.html',
  styleUrls: ['./store-add.component.css']
})
export class StoreAddComponent implements OnInit {

  addstoreForm:FormGroup|any;
  private newStore:Store = new Store();
  constructor(private storeService:StoreService,private routh:Router) { }

  ngOnInit(): void {
    this.addstoreForm = new FormGroup({
      name:new FormControl('')
    })
  }
  submit(form:FormGroup){
    this.newStore = form.value;
    this.storeService.create(this.newStore);
    this.routh.navigateByUrl('stores');
  }

}
