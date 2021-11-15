import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  adduserForm:FormGroup|any;
  private newDrug:User = new User();
  private idparam:string|any;
  constructor(private userService:UsersService,private routh:Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.adduserForm = new FormGroup({
      name:new FormControl(''),
      email:new FormControl(''),
      password:new FormControl(''),
      role:new FormControl('')
    });
    this.activatedRoute.params.subscribe(paramId =>{
      this.idparam = paramId.id;
    });
    this.userService.getById(this.idparam).subscribe(data=>{
      this.newDrug = data;
      this.adduserForm.setValue({name:data.name,email:data.email,password:data.password,role:data.role});
    });
  }
  submit(form:FormGroup){
    this.newDrug = form.value;
    this.userService.update(this.idparam,this.newDrug);
    this.routh.navigateByUrl('user');
  }

}
