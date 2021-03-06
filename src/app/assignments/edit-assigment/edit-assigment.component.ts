import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Matiere } from '../model/matiere.model';
import { MatieresService } from "../../shared/matieres.service";
import { LoginService } from "../../shared/login.service"
import { MatSnackBar } from "@angular/material/snack-bar";
import { AngularFaviconService } from 'angular-favicon';



@Component({
  selector: 'app-edit-assigment',
  templateUrl: './edit-assigment.component.html',
  styleUrls: ['./edit-assigment.component.css']
})
export class EditAssigmentComponent implements OnInit {
  assignment:Assignment;
  matieres:Matiere[];
  // pour le formulaire
  nom = "";
  dateDeRendu = null;
  id_matiere: number;
  remarques = "";
  isAdmin : boolean;
  note: number;
  auteur: string;

  constructor(
    private assignmentsService: AssignmentsService,
    private matieresService: MatieresService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {

    // this.loginService.check().subscribe((user)=> {
    //   this.isAdmin = user.isAdmin;
    // })
    
    // if(localStorage.getItem('token')==null || !this.isAdmin){alert("vous n'avez pas de tokken,veillez vous connecter");
    // this.router.navigate(["/login"]);}

    // ici on montre comment on peut récupérer les parametres http
    // par ex de :
    // http://localhost:4200/assignment/1/edit?nom=Michel%20Buffa&metier=Professeur&responsable=MIAGE#edition

    if (localStorage.getItem("token") == null) {
      this.router.navigate(["/login"]);
      this._snackBar.open("veillez vous connectez", "ok");
    }

    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);

    this.getAssignmentById();
    this.getMatieres()
  }

  getMatieres(){
    this.matieresService.getMatieres().subscribe(data=>{
      this.matieres = data
    })
  }

  getAssignmentById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id: number = +this.route.snapshot.params.id;

    console.log('Dans ngOnInit de Edit, id = ' + id);
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignment = assignment;
      this.id_matiere = assignment.id_matiere;
      this.nom = assignment.nom;
      this.dateDeRendu = assignment.dateDeRendu;
      this.note = assignment.note;
      this.auteur = assignment.auteur;
      this.remarques = assignment.remarques as string;
      
    });
  }


  onSubmit(event) {
    if(localStorage.getItem('token')==null){alert("vous n'avez pas de tokken,veillez vous connecter");
    this.router.navigate(["/login"]);}
    // on va modifier l'assignment
    if((!this.nom) || (!this.dateDeRendu)) return;
    this.assignment.nom = this.nom;
    this.assignment.dateDeRendu = this.dateDeRendu;
    console.log("Id matiere en cours:" + this.assignment.id_matiere);
    this.assignment.id_matiere = this.id_matiere;
    this.assignment.remarques = this.remarques;
    this.assignment.note = this.note;
    this.assignment.auteur = this.auteur;

    this.assignmentsService.updateAssignment(this.assignment)
      .subscribe(message => {
        console.log(message);

        // et on navigue vers la page d'accueil
        this.router.navigate(["/home"]);
      })

  }
}
