import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Assignment } from '../assignment.model';
import { LoginService } from "../../shared/login.service"


import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
  // passé sous forme d'attribut HTML
  assignmentTransmis: any;
  isAdmin: boolean;

  constructor(private _snackBar: MatSnackBar,
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService,
    private loginService: LoginService,
  ) {}

  ngOnInit(): void {
    if(localStorage.getItem('token')==null){
      this._snackBar.open('message');
      this.router.navigate(["/login"]);
    }
    this.loginService.check().subscribe((user)=> {
      this.isAdmin = user.isAdmin;
    })
    this.getAssignmentById();
  }

  getAssignmentById() {
    // les params sont des string, on va forcer la conversion
    // en number en mettant un "+" devant
    const id: number = +this.route.snapshot.params.id;

    console.log('Dans ngOnInit de details, id = ' + id);
    this.assignmentsService.getAssignment(id).subscribe((assignment) => {
      this.assignmentTransmis = assignment;
      console.log(this.assignmentTransmis);
    });
  }

  onAssignmentRendu() {
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
    console.log("Edit clicked");
    this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'], 
      // {
      //   queryParams: {
      //     nom:'Michel Buffa',
      //     metier:"Professeur",
      //     responsable:"MIAGE"
      //   },
      //   fragment:"edition"
      // }
    );
  }

  // isAdmin() {
  //   return this.authService.admin;
  // }
}
