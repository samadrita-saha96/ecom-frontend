import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  //baseUrl="http://127.0.0.1:8000/";
  baseUrl="https://elite-in.herokuapp.com/";
  constructor(
    private httpClient:HttpClient,
  ) { }

  headers=new HttpHeaders({
    'Content-Type': 'application/json',
  })

  newAddress(data){
    const body=JSON.stringify(data)
    return this.httpClient.post(`${this.baseUrl}address/`, body, {headers: this.headers});
  }

  getAddress(data){
    const body=JSON.stringify(data)
    return this.httpClient.post(`${this.baseUrl}getUserAddress/`, body, {headers: this.headers})
  }
}
