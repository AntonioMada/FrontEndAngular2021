import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // Pour les champs du formulaire
  nom = '';
  dateDeRendu = null;

  constructor(private assignmentsService:AssignmentsService,
              private router:Router) {}

  ngOnInit(): void {
    if(localStorage.getItem('token')==null){alert("vous n'avez pas de tokken,veillez vous connecter");
    this.router.navigate(["/login"]);}}

  onSubmit(event) {
    if(localStorage.getItem('token')==null){alert("vous n'avez pas de tokken,veillez vous connecter");
    this.router.navigate(["/login"]);}
    if((!this.nom) || (!this.dateDeRendu)) return;

    let nouvelAssignment = new Assignment();
    nouvelAssignment.nom = this.nom;
    nouvelAssignment.dateDeRendu = this.dateDeRendu;
    nouvelAssignment.rendu = false;

    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(reponse => {
        console.log(reponse.message);

         // et on navigue vers la page d'accueil qui affiche la liste
         this.router.navigate(["/home"]);
      });
  }

}
