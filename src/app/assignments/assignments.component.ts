import { CdkVirtualScrollViewport } from "@angular/cdk/scrolling";
import { Component, NgZone, OnInit, ViewChild, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, map, pairwise, tap, throttleTime } from "rxjs/operators";
import { AssignmentsService } from "../shared/assignments.service";
import { Assignment } from "./assignment.model";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { assignementsDialogue } from "./dialogue/assignementsdialogue.component";
import { MatieresService } from "../shared/matieres.service";

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: "app-assignments",
  templateUrl: "./assignments.component.html",
  styleUrls: ["./assignments.component.css"],
})
export class AssignmentsComponent implements OnInit {
  assignments: Assignment[];
  assignmentsrendu: Assignment[];
  assignmentsdialogue: Assignment;
  assignmentsnonrendu: Assignment[];
  assignementsDialogue:assignementsDialogue;
  page: any = {} ;
  limit: any = {} ;
  search = ""
  totalDocs: any = {};
  totalPages: any = {};
  hasPrevPage: any = {};
  prevPage: any = {};
  hasNextPage: any = {};
  nextPage: any = {};
  newnote: number;
  // page: number = 1;
  // limit: number = 100;
  // totalDocs: number;
  // totalPages: number;
  // hasPrevPage: boolean;
  // prevPage: number;
  // hasNextPage: boolean;
  // nextPage: any;

  @ViewChild("scrollerrendu") scrollerrendu: CdkVirtualScrollViewport;
  @ViewChild("scrollernonrendu") scrollernonrendu: CdkVirtualScrollViewport;


  // on injecte le service de gestion des assignments
  constructor(private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private assignmentsService: AssignmentsService,
    private matieresService: MatieresService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone) {
      this.page.rendu = 1;
      this.limit.rendu = 100;
      this.page.nonrendu = 1;
      this.limit.nonrendu = 100;
      
  }

  ngOnInit() {
    if(localStorage.getItem('token')==null){
    this.router.navigate(["/login"]);
    this._snackBar.open('veillez vous connectez','ok');
  }
   else{
    console.log("AVANT AFFICHAGE");
    // on regarde s'il y a page= et limit = dans l'URL  
    this.route.queryParams.subscribe((queryParams) => {
      console.log("Dans le subscribe des queryParams");
      this.page.rendu = +queryParams.page || 1;
      this.limit.rendu = +queryParams.limit || 10;

      // this.getAssignments();
      this.getAssignmentsRendu();
      this.getAssignmentsNonRendu();
    });
    console.log("getAssignments() du service appelé");}
  }

  // getAssignments() {
  //   this.assignmentsService
  //     .getAssignmentsPagine(this.page, this.limit)
  //     .subscribe((data) => {
  //       this.assignments = data.docs;
  //       this.page.rendu = data.page;
  //       this.limit.rendu = data.limit;
  //       this.totalDocs = data.totalDocs;
  //       this.totalPages = data.totalPages;
  //       this.hasPrevPage = data.hasPrevPage;
  //       this.prevPage = data.prevPage;
  //       this.hasNextPage = data.hasNextPage;
  //       this.nextPage = data.nextPage;
  //       console.log(this);
  //       console.log("données reçues");
  //     });
  // }

  getAssignmentsRendu() {
    this.assignmentsService
      .getAssignmentsRendu(this.search,this.page.rendu, this.limit.rendu)
      .subscribe((data) => {
        this.assignmentsrendu = data.docs;
        this.page.rendu = data.page;
        this.limit.rendu = data.limit;
        this.totalDocs.rendu = data.totalDocs;
        this.totalPages.rendu = data.totalPages;
        this.hasPrevPage.rendu = data.hasPrevPage;
        this.prevPage.rendu = data.prevPage;
        this.hasNextPage.rendu = data.hasNextPage;
        console.log("Check if données rendues reçues has next page:"+data.hasNextPage);
        console.log("Check if this has next page:"+ this.hasNextPage.rendu);
        this.nextPage.rendu = data.nextPage;
        console.log(data);
        console.log("données rendues reçues");
      });
  }

  getAssignmentsNonRendu() {
    this.assignmentsService
      .getAssignmentsNonRendu(this.search,this.page, this.limit)
      .subscribe((data) => {
        this.assignmentsnonrendu = data.docs;
        this.page.nonrendu = data.page;
        this.limit.nonrendu = data.limit;
        this.totalDocs.nonrendu = data.totalDocs;
        this.totalPages.nonrendu = data.totalPages;
        this.hasPrevPage.nonrendu = data.hasPrevPage;
        this.prevPage.nonrendu = data.prevPage;
        this.hasNextPage.nonrendu = data.hasNextPage;
        this.nextPage.nonrendu = data.nextPage;
        console.log(data);
        console.log("données non rendues reçues");
      });
  }

  getPlusDAssignmentsPourScrolling() {
    this.assignmentsService
      .getAssignmentsRendu(this.search,this.page.rendu, this.limit.rendu)
      .subscribe((data) => {
        console.log("données reçues dans les assigments pour scrolling");

        console.log(data);
        // au lieu de remplacer this.assignments par les nouveaux assignments récupérés
        // on va les ajouter à ceux déjà présents...
        this.assignmentsrendu = this.assignmentsrendu.concat(data.docs);
        // this.assignments = [...this.assignments, ...data.docs];
        this.page.rendu = data.page;
        this.limit.rendu = data.limit;
        this.totalDocs.rendu = data.totalDocs;
        this.totalPages.rendu = data.totalPages;
        this.hasPrevPage.rendu = data.hasPrevPage;
        this.prevPage.rendu = data.prevPage;
        this.hasNextPage.rendu = data.hasNextPage;
        this.nextPage.rendu = data.nextPage;
        console.log(this.assignmentsrendu);
        console.log("données reçues dans les assignments pour scrolling");
      });
  }
  getPlusDAssignmentsNonPourScrolling() {
    this.assignmentsService
      .getAssignmentsNonRendu(this.search,this.page.nonrendu, this.limit.nonrendu)
      .subscribe((data) => {
        console.log("données reçues dans les assigments pour scrolling");

        console.log(data);
        // au lieu de remplacer this.assignments par les nouveaux assignments récupérés
        // on va les ajouter à ceux déjà présents...
        this.assignmentsnonrendu = this.assignmentsnonrendu.concat(data.docs);
        // this.assignments = [...this.assignments, ...data.docs];
        this.page.nonrendu = data.page;
        this.limit.nonrendu = data.limit;
        this.totalDocs.nonrendu = data.totalDocs;
        this.totalPages.nonrendu = data.totalPages;
        this.hasPrevPage.nonrendu = data.hasPrevPage;
        this.prevPage.nonrendu = data.prevPage;
        this.hasNextPage.nonrendu = data.hasNextPage;
        this.nextPage.nonrendu = data.nextPage;
        console.log(this.assignmentsnonrendu);
        console.log("données reçues dans les assignments pour scrolling");
      });
  }
  ngAfterViewInit() {
    // Appelé automatiquement après l'affichage, donc l'élément scroller aura
    // et affiché et ne vaudra pas "undefined" (ce qui aurait été le cas dans ngOnInit)

    // On va s'abonner aux évenements de scroll sur le scrolling...
    this.scrollerrendu
      .elementScrolled()
      .pipe(
        map((event) => {
          return this.scrollerrendu.measureScrollOffset("bottom");
        }),
        pairwise(),
        /*
        tap(([y1, y2]) => {
          if(y2 < y1) {
            console.log("ON SCROLLE VERS LE BAS !")
          } else {
            console.log("ON SCROLLE VERS LE HAUT !")
          }
        }),
        */
        filter(([y1, y2]) => y2 < y1 && y2 < 200),
        throttleTime(200) // on ne va en fait envoyer le dernier événement que toutes les 200ms.
        // on va ignorer tous les évéments arrivés et ne garder que le dernier toutes
        // les 200ms
      )
      .subscribe((dist) => {
        this.ngZone.run(() => {
          if (this.hasNextPage.rendu) {
            this.page.rendu = this.nextPage.rendu;
            console.log(
              "Je charge de nouveaux assignments page = " + this.page.rendu
            );
            this.getPlusDAssignmentsPourScrolling();
          }
        });
      });

      this.scrollernonrendu
      .elementScrolled()
      .pipe(
        map((event) => {
          return this.scrollernonrendu.measureScrollOffset("bottom");
        }),
        pairwise(),
        /*
        tap(([y1, y2]) => {
          if(y2 < y1) {
            console.log("ON SCROLLE VERS LE BAS !")
          } else {
            console.log("ON SCROLLE VERS LE HAUT !")
          }
        }),
        */
        filter(([y1, y2]) => y2 < y1 && y2 < 200),
        throttleTime(200) // on ne va en fait envoyer le dernier événement que toutes les 200ms.
        // on va ignorer tous les évéments arrivés et ne garder que le dernier toutes
        // les 200ms
      )
      .subscribe((dist) => {
        this.ngZone.run(() => {
          console.log("tonga eto scroll non");
          console.log(this.hasNextPage.nonrendu)
          if (this.hasNextPage.nonrendu) {
            this.page.nonrendu = this.nextPage.nonrendu;
            console.log(
              "Je charge de nouveaux assignments page = " + this.page.nonrendu
            );
            this.getPlusDAssignmentsNonPourScrolling();
          }
        });
      });
  }

  onDeleteAssignment(event) {
    // event = l'assignment à supprimer

    //this.assignments.splice(index, 1);
    this.assignmentsService.deleteAssignment(event).subscribe((message) => {
      console.log(message);
    });
  }

  // premierePage() {
  //   this.router.navigate(["/home"], {
  //     queryParams: {
  //       page: 1,
  //       limit: this.limit,
  //     },
  //   });
  // }

  // pageSuivante() {
  //   /*
  //   this.page = this.nextPage;
  //   this.getAssignments();*/
  //   this.router.navigate(["/home"], {
  //     queryParams: {
  //       page: this.nextPage,
  //       limit: this.limit,
  //     },
  //   });
  // }

  // pagePrecedente() {
  //   this.router.navigate(["/home"], {
  //     queryParams: {
  //       page: this.prevPage,
  //       limit: this.limit,
  //     },
  //   });
  // }

  // dernierePage() {
  //   this.router.navigate(["/home"], {
  //     queryParams: {
  //       page: this.totalPages,
  //       limit: this.limit,
  //     },
  //   });
  // }
  searchs(event) {
   console.log(this.search);
   
   this.getAssignmentsRendu();
   this.getAssignmentsNonRendu();
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      console.log("previous === container");
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.dialog.open(assignementsDialogue, {
        data: {
          assigns: event.item.data,
          tableau:  new Array(21)
        }
      });
        console.log(event.item.data);
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        
    }
  }
  
}