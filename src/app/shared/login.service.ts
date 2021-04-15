import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http:HttpClient) {}

  //  uri = "http://localhost:8010/api/users";
  //  uritoken = "http://localhost:8010/api/users/check";
  uri = "https://backend2021.herokuapp.com/api/users";
  uritoken = "https://backend2021.herokuapp.com/api/users/check";
 
  login(login,mdp): Observable<boolean>{
   // console.log(login+"  "+mdp)
    const body = { 'name': login ,'password': mdp };
    return this.http.post<{token: string}>(this.uri,  body) 
    .pipe(
      map(result => {
        localStorage.setItem('token', result.token);
       
        return true;
      })
    );
  }
  check():Observable<any>{
    const body = { 'token': localStorage.getItem('token') };
    console.log(localStorage.getItem('token'));
    
    return this.http.post(this.uritoken, body);
     
  }
  logOut() {
  }


}
