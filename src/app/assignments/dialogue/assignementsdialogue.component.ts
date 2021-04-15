import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AssignmentsService } from "../../shared/assignments.service";
import { Assignment } from "../assignment.model";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: "assignements.dialogue",
  templateUrl: "assignements.dialogue.html",
})
export class assignementsDialogue {
  note = 0;
  assignment: Assignment;
  rendus = "";
  constructor(
    private _snackBar: MatSnackBar,
    private assignmentsService: AssignmentsService,
    private router: Router,
    public dialog: MatDialogRef<assignementsDialogue>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  onNoClick() {
    this.dialog.close();
  }
  submit(assignment: Assignment) {
    console.log(this.note);
    this.dialog.close();
    this.assignment = assignment;
    if (assignment.rendu) {
      this.assignment.note = null;
      this.assignment.rendu = false;
      this.rendus = "L'assignement est modifié non rendu avec la note de " + this.note;
    } else {
      this.assignment.note = this.note;
      this.assignment.rendu = true;
      this.rendus = "L'assignement est rendu avec la note de " + this.note;
    }
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((message) => {
        window.location.reload();
      });
    this._snackBar.open(this.rendus, "ok");
  }
}
