import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private routh:Router) { }
  public sessionresult:string|any;
  ngOnInit(): void {
    this.sessionresult = sessionStorage.getItem('you have the privilage @medicodb');
    if(this.sessionresult=="privilage@medicodb")
      this.sessionresult = true;
    else
      this.sessionresult = false;
  }
  logout(){
    sessionStorage.removeItem('privilage@medicodb');
    sessionStorage.clear();
    this.routh.navigateByUrl('landingpage');
  }
  title = 'medico db';
}
