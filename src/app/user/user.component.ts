import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { LoginService } from "../shared/login.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  name=""
  password=""
  error=""
  constructor(
    private loginService:LoginService,
    private router:Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {  
    this.error;
  }
  login(event) {
    let name = this.name
    let password = this.password

    this.loginService.login(name,password)  
      .subscribe(reponse => {
        
        this.router.navigate(["/home"]);
    }, error => {
      this.error=error.error;
      this.router.navigate(["/login"],error.error);
    });
  }
}
