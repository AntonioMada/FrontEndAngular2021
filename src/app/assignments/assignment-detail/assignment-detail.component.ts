import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  // passé sous forme d'attribut HTML
  assignmentTransmis: Assignment;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    if(localStorage.getItem('token')==null){alert("vous n'avez pas de tokken,veillez vous connecter");
    this.router.navigate(["/login"]);}
    this.getAssignmentById();
  }

  getAssignmentById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id: number = +this.route.snapshot.params.id;

    console.log('Dans ngOnInit de details, id = ' + id);
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignmentTransmis = assignment;
    });
  }

  onAssignmentRendu() {
    if(localStorage.getItem('token')==null){alert("vous n'avez pas de tokken,veillez vous connecter");
    this.router.navigate(["/login"]);}
    this.assignmentTransmis.rendu = true;

    this.assignmentsService
      .updateAssignment(this.assignmentTransmis)
      .subscribe((reponse) => {
        console.log(reponse.message);
        // et on navigue vers la page d'accueil qui affiche la liste
        this.router.navigate(['/home']);
      });

    //this.assignmentTransmis = null;
  }

  onDelete() {
    if(localStorage.getItem('token')==null){alert("vous n'avez pas de tokken,veillez vous connecter");
    this.router.navigate(["/login"]);}
    this.assignmentsService
      .deleteAssignment(this.assignmentTransmis)
      .subscribe((reponse) => {
        console.log(reponse.message);

        // on cache l'affichage du détail
        this.assignmentTransmis = null;

        // et on navigue vers la page d'accueil qui affiche la liste
        this.router.navigate(['/home']);
      });
  }

  onClickEdit() {
    if(localStorage.getItem('token')==null){alert("vous n'avez pas de tokken,veillez vous connecter");
    this.router.navigate(["/login"]);}
    this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'], {
      queryParams: {
        nom:'Michel Buffa',
        metier:"Professeur",
        responsable:"MIAGE"
      },
      fragment:"edition"
    });
  }

  isAdmin() {
    if(localStorage.getItem('token')==null){alert("vous n'avez pas de tokken,veillez vous connecter");
    this.router.navigate(["/login"]);}
    return this.authService.admin;
  }
}
