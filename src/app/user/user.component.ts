import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from "../shared/login.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  name=""
  password=""

  constructor(
    private loginService:LoginService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }
  login(event) {
    let name = this.name
    let password = this.password

    this.loginService.login(name,password)  
      .subscribe(reponse => {
        console.log("ao mety");

        // et on navigue vers la page d'accueil qui affiche la liste
        this.router.navigate(["/home"]);
    });
  }
}
