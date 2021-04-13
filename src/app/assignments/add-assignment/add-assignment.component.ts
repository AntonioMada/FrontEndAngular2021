import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { MatieresService } from 'src/app/shared/matieres.service';
import { Assignment } from '../assignment.model';
import { Matiere } from '../model/matiere.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  matieres:Matiere[];

  // Pour les champs du formulaire
  nom = "";
  dateDeRendu = null;
  id_matiere: number;
  remarques = "";

  constructor(
    private assignmentsService:AssignmentsService,
    private router:Router,
    private matieresService: MatieresService,
  ) {}

              

  ngOnInit(): void {
    if(localStorage.getItem('token')==null){alert("vous n'avez pas de tokken,veillez vous connecter");
    this.router.navigate(["/login"]);}
    this.getMatieres()
  }

  onSubmit(event) {
    if(localStorage.getItem('token')==null){alert("vous n'avez pas de tokken,veillez vous connecter");
    this.router.navigate(["/login"]);}
    if((!this.nom) || (!this.dateDeRendu)) return;

    let nouvelAssignment = new Assignment();
    // let nouvelAssignment : any;
    nouvelAssignment.nom = this.nom;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;
    nouvelAssignment.remarques = this.remarques;
    this.matieres.forEach(e => {
      if(e.id == this.id_matiere) {
        nouvelAssignment.matiere = e._id
        nouvelAssignment.id_matiere = e.id
      }
    });
    console.log("On submit")
    console.log(nouvelAssignment);
    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);

         // et on navigue vers la page d'accueil qui affiche la liste
         this.router.navigate(["/home"]);
      });
  }

  generateId(): number {
    return Math.round(Math.random() * 100000);
  }


  getMatieres(){
    this.matieresService.getMatieres().subscribe(data=>{
      this.matieres = data
    })
  }

}
