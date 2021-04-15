import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';
import { LoginService } from './shared/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showMenu = true;
  title = 'Application de gestion des assignments';

  constructor(private authService:AuthService, private router:Router,
              private assignmentsService:AssignmentsService,private loginService:LoginService) {}
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)  
    ).subscribe((event: NavigationStart) => {
      this.showMenu = event.url !== '/login'; 
    });
  }
  login() {
    // si je suis pas loggé, je me loggue, sinon, si je suis
    // loggé je me déloggue et j'affiche la page d'accueil

    if(this.authService.loggedIn) {
      // je suis loggé
      // et bien on se déloggue
      this.authService.logOut();
      // on navigue vers la page d'accueil
      this.router.navigate(["/home"]);
    } else {
      // je ne suis pas loggé, je me loggue
      this.authService.logIn("admin", "toto");
    }
  }
  disconnect() {
    localStorage.removeItem('token');
        this.router.navigate(["/login"]);
  }
  
  check() {
    if(localStorage.getItem('token')==null){alert("vous n'avez pas de tokken,veillez vous connecter");
    this.router.navigate(["/login"])
    }else{
      this.loginService.check().subscribe((reponse) => {
        console.log(reponse);
        alert(reponse.name+"  "+reponse.email);
      });}
  }
  peuplerBD() {
    if(localStorage.getItem('token')==null){alert("vous n'avez pas de tokken,veillez vous connecter");
    this.router.navigate(["/login"]);}
    // version naive et simple
    //this.assignmentsService.peuplerBD();

    // meilleure version :
    this.assignmentsService.peuplerBDAvecForkJoin()
      .subscribe(() => {
        console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES, ON RE-AFFICHE LA LISTE");
        this.router.navigate(["/home"], {replaceUrl:true});
      })
      
  }
  newpeuplerBD(){
    console.log("Populate db clicked");
    this.assignmentsService.populateDB()
  }
}
