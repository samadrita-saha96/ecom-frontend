import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  //baseUrl="http://127.0.0.1:8000/"
  baseUrl="https://elite-in.herokuapp.com/";
  constructor(
    private httpClient: HttpClient,
  ) { }

  
registerUser(authData) {
  const body = JSON.stringify(authData);
  return this.httpClient.post(`${this.baseUrl}user/`, body, {headers: this.headers});
}

getUser(): Observable<any>{
  return this.httpClient.get(`${this.baseUrl}user/`,{headers:this.headers});
}
}