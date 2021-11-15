import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  adduserForm:FormGroup|any;
  private newUser:User = new User();
  constructor(private userService:UsersService,private routh:Router) { }

  ngOnInit(): void {
    this.adduserForm = new FormGroup({
      name:new FormControl(''),
      email:new FormControl(''),
      password:new FormControl(''),
      role:new FormControl('')
    })
  }
  submit(form:FormGroup){
    this.newUser = form.value;
    this.newUser.password = CryptoJS.AES.encrypt(this.newUser.password!,"medicodbkey").toString();
    this.userService.create(this.newUser);
    this.routh.navigateByUrl('user');
  }

}
