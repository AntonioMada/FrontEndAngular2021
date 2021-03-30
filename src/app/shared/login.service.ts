import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http:HttpClient) {}

  uri = "http://localhost:8010/api/users";
 // uri = "https://backend2021.herokuapp.com/api/assignments"
 
  login(login,mdp){
   // console.log(login+"  "+mdp)
    const body = { 'name': login ,'password': mdp };
    return this.http.post(this.uri,  body);
  }

  logOut() {
  }


}
