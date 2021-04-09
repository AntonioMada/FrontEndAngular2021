import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AssignmentsService } from "../../shared/assignments.service";
import { Assignment } from "../assignment.model";
import { Router } from '@angular/router';
@Component({
    selector: 'assignements.dialogue',
    templateUrl: 'assignements.dialogue.html',
  })
  export class assignementsDialogue {
    note=0;
    assignment:Assignment;
    rendus="";
    constructor(
      private assignmentsService: AssignmentsService,private router:Router,
      public dialog: MatDialogRef<assignementsDialogue>,@Inject(MAT_DIALOG_DATA) public data) {
    }
    
    onNoClick() {
      
      this.dialog.close();
    }
    submit(assignment:Assignment) {
       
       console.log(this.note);
       this.assignment=assignment;
      this.assignment.note=this.note;
      if(assignment.rendu){
        this.assignment.rendu=false
        this.rendus="l'assignements est modifié de non rendu avec la note de "+this.note;
      }else{
        this.assignment.rendu=true
        this.rendus="l'assignements est rendu avec la note de "+this.note;
      };
      this.assignmentsService.updateAssignment(this.assignment)
         .subscribe(message => {
          this.dialog.close();
          window.location.reload();
          alert(this.rendus);
          console.log(message);
         })
    }
}