import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable, of } from "rxjs";
import { catchError, filter, map, tap } from "rxjs/operators";
import { Assignment } from "../assignments/assignment.model";
import { LoggingService } from "./logging.service";
import { assignmentsGeneres } from "./datamock";
import { Matiere } from "../assignments/model/matiere.model";
import { MatieresService } from "./matieres.service";

@Injectable({
  providedIn: "root",
})
export class AssignmentsService {
  // assignments: Assignment[];
  

  constructor(
    private loggingService: LoggingService,
    private matiereService: MatieresService,
    private http: HttpClient
  ) {}

  //  uri = "http://localhost:8010/api/assignments";
  //  uri_rendu = "http://localhost:8010/api/rendu"
  //  uri_nonrendu = "http://localhost:8010/api/nonrendu"
   uri = "https://backend2021.herokuapp.com/api/assignments"
   uri_rendu = "https://backend2021.herokuapp.com/api/rendu"
   uri_nonrendu = "https://backend2021.herokuapp.com/api/nonrendu"

  getAssignments(): Observable<Assignment[]> {
    console.log("Dans le service de gestion des assignments...");
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.uri);
  }

  getAssignmentsRendu(search,page: number, limit: number): Observable<any>{
    console.log("Dans le service de gestion des assignments rendus...");
    //return of(this.assignments);
    var val = this.http.get<Assignment[]>(
      this.uri_rendu + "?page=" + page + "&limit=" + limit+" &search=" +search
    )
    return val; 
  }

  getAssignmentsNonRendu(search,page: number, limit: number): Observable<any>{
    console.log("Dans le service de gestion des assignments non rendus...");
    //return of(this.assignments);
    return this.http.get<Assignment[]>(
      this.uri_nonrendu + "?page=" + page + "&limit=" + limit+ "&search=" +search
    );
  }

  getAssignmentsPagine(page: number, limit: number): Observable<any> {
    return this.http.get<Assignment[]>(
      this.uri + "?page=" + page + "&limit=" + limit
    );
  }

  // Pour votre culture, on peut aussi utiliser httpClient avec une promesse
  // et then, async, await etc. Mais ce n'est pas la norme chez les developpeurs
  // Angular
  getAssignmentsAsPromise(): Promise<Assignment[]> {
    console.log("Dans le service de gestion des assignments...");
    //return of(this.assignments);
    return this.http.get<Assignment[]>(this.uri).toPromise();
  }

  getAssignment(id: number): Observable<Assignment> {
    //let assignementCherche = this.assignments.find(a => a.id === id);

    //return of(assignementCherche);
    return this.http.get<Assignment>(this.uri + "/" + id)
    // return this.http.get<Assignment>(this.uri + "/" + id).pipe(
    //   // traitement 1
    //   map((a) => {
    //     // a.nom += " MODIFIE PAR MAP";
    //     console.log("Dans MAP");
    //     console.log(a);
    //     console.log("Sortie de map")
    //     return a;
    //   }),
    //   tap((a) => {
    //     console.log("TRACE DANS TAP : j'ai re??u " + a.nom);
    //   }),
    //   /*
    //   filter(a => {
    //     return (a.rendu)
    //   })
    //   */
    //   catchError(
    //     this.handleError<any>(
    //       "### catchError: getAssignments by id avec id=" + id
    //     )
    //   )
    // );
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + " a ??chou?? " + error.message);

      return of(result as T);
    };
  }

  generateId(): number {
    return Math.round(Math.random() * 100000);
  }

  addAssignment(assignment: Assignment): Observable<any> {
    assignment.id = this.generateId();
    console.log("Id de l'assignment ins??r?? :"+assignment.id);
    async () => {
      let matieres = await this.matiereService.getMatieres();
      console.log("Getting matieres")
      console.log(matieres)
    }
    //this.loggingService.log(assignment.nom, " a ??t?? ajout??");

    /*this.assignments.push(assignment);


    return of("Service: assignment ajout?? !");*/

    return this.http.post(this.uri, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    // besoin de ne rien faire puisque l'assignment pass?? en param??tre
    // est d??j?? un ??l??ment du tableau

    //let index = this.assignments.indexOf(assignment);

    //console.log("updateAssignment l'assignment pass?? en param est ?? la position " + index + " du tableau");
    this.loggingService.log(assignment.nom, " a ??t?? modifi??");

    return this.http.put(this.uri, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    /*
    let index = this.assignments.indexOf(assignment);

    this.assignments.splice(index, 1);
    */

    this.loggingService.log(assignment.nom, " a ??t?? supprim??");

    return this.http.delete(this.uri + "/" + assignment._id);
  }

  peuplerBD() {
    //const objectId = ["60608224ee0ca096a8127ac6", "60608224ee0ca096a8127ac7", "60608224ee0ca096a8127ac8", "60608224ee0ca096a8127ac9"];
 
    assignmentsGeneres.forEach((a) => {   
      //const random = Math.floor(Math.random() * objectId.length);
      let nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.id = a.id;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
          
      if(nouvelAssignment.rendu) nouvelAssignment.note = a.note;
      nouvelAssignment.auteur = a.auteur;
      nouvelAssignment.remarques = a.remarques;
      nouvelAssignment.id_matiere = a.id_matiere;
      this.addAssignment(nouvelAssignment).subscribe((reponse) => {
        console.log(reponse.message);
      });
    });
  }

  // autre version qui permet de r??cup??rer un subscribe une fois que tous les inserts
  // ont ??t?? effectu??s
  peuplerBDAvecForkJoin(): Observable<any> {
   // const objectId = ["60608224ee0ca096a8127ac6", "60608224ee0ca096a8127ac7", "60608224ee0ca096a8127ac8", "60608224ee0ca096a8127ac9"];
    
  
    const appelsVersAddAssignment = [];

    assignmentsGeneres.forEach((a) => {
      //const random = Math.floor(Math.random() * objectId.length);
      let nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.id = a.id;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      if(nouvelAssignment.rendu) nouvelAssignment.note = a.note;
      nouvelAssignment.auteur = a.auteur;
      nouvelAssignment.remarques = a.remarques;
      nouvelAssignment.id_matiere =a.id_matiere //objectId[random];
      console.log(nouvelAssignment.id_matiere);
      this.addAssignment(nouvelAssignment).subscribe((reponse) => {
         console.log(reponse.message);
      });
    });
    return forkJoin(appelsVersAddAssignment); // renvoie un seul Observable pour dire que c'est fini
  }

  populateDB(): Observable<any> {
    // this.http.get(this.uri.)
    console.log("assignement service: populating db")
    return this.http.get(this.uri+"/populatedb")
  }
}
