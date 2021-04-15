import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { forkJoin, Observable, of } from "rxjs";
import { catchError, filter, map, tap } from "rxjs/operators";
import { Assignment } from "../assignments/assignment.model";
import { LoggingService } from "./logging.service";
import { assignmentsGeneres } from "./data";
import { AssignMatiere } from "../assignments/model/assignsMatiere.model";
import { Matiere } from "../assignments/model/matiere.model";

@Injectable({
  providedIn: "root",
})
export class MatieresService {
  assignments: Assignment[];
  view:AssignMatiere[];
  constructor(
    private loggingService: LoggingService,
    private http: HttpClient
  ) {}

  
  // uri = "http://localhost:8010/api/matieres"
  uri = "https://backend2021.herokuapp.com/api/matieres"


  getMatieres(): Observable<Matiere[]> {
    console.log("Dans le service de gestion des matières...");
    return this.http.get<Matiere[]>(this.uri);
  }
}
