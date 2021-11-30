import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users.service';
import * as CryptoJS from 'crypto-js'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  adduserForm:FormGroup|any;
  private newUser:User = new User();
  constructor(private userService:UsersService,private routh:Router) { }

  ngOnInit(): void {
    this.adduserForm = new FormGroup({
      email:new FormControl(''),
      password:new FormControl('')
    })
  }
  submit(form:FormGroup){
    this.newUser = form.value;
    this.userService.getByEmail(this.newUser.email).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data=>{
      if(data.length>0)
      {
        if(CryptoJS.AES.decrypt(data[0].password!,"medicodbkey").toString(CryptoJS.enc.Utf8)==this.newUser.password)
        {
          sessionStorage.setItem('you have the privilage @medicodb', 'privilage@medicodb');
          
          this.routh.navigateByUrl('landingpage');
        }
        else
        {
          alert("please try agin !")
        }
      }
      else
        alert("please try agin !")
    });
  }

}
