import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //baseUrl="http://127.0.0.1:8000/";
  baseUrl="https://elite-in.herokuapp.com/";

  constructor(
    private httpClient:HttpClient,
    private cookies : CookieService,
    ) { }

  headers=new HttpHeaders({
    'Content-Type': 'application/json',
  })

  loginUser(authData){
    const body=JSON.stringify(authData);
    return this.httpClient.post(`${this.baseUrl}auth/`, body, {headers: this.headers});
  }
  logoutUser(user){
    const body =JSON.stringify(user);
    return this.httpClient.post(`${this.baseUrl}logout/`,body,{headers: this.headers});
  }
  // getAuthHeader(){
  //   const token=this.cookies.get('mr-token');
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //      Authorization: `Token ${token}`
  //   });
  // }
  getUser(token){
    const body=JSON.stringify(token);
    return this.httpClient.post(`${this.baseUrl}get_logged_user/`, body, {headers: this.headers});
  }
  passforget(data){
    const body=JSON.stringify(data);
    return this.httpClient.post(`${this.baseUrl}forget_password/`,body, {headers: this.headers});
  }
}
