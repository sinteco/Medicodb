import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/users.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService:UsersService,private routh:Router) { }

  users?:User[];
  ngOnInit(): void {
    this.retriveAll();
  }

  retriveAll(){
    this.userService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.users = data;
    });
  }
  delete(drugid:any){
    this.userService.delete(drugid).then(()=>{
      this.routh.navigateByUrl('user');
    });
  }
  @Output() myEvent = new EventEmitter<string>();
  edit(drug:User){
    this.routh.navigateByUrl('user/'+drug.id);
  }

}
