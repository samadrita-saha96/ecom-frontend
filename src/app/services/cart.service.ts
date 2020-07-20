import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  //zbaseUrl="http://127.0.0.1:8000/";
  baseUrl="https://elite-in.herokuapp.com/";
  constructor(
    private httpClient:HttpClient
  ) { }

  headers=new HttpHeaders({
    'Content-Type': 'application/json',
  })

  addtocart(cartdata){
    const body=JSON.stringify(cartdata)
    return this.httpClient.post(`${this.baseUrl}cart/`, body, {headers: this.headers})
  }

  getcartitem(uemail){
    const body=JSON.stringify(uemail)
    return this.httpClient.post(`${this.baseUrl}viewcart/`,body, {headers: this.headers})
  }
  removecartitem(id){
    const body=JSON.stringify(id)
    return this.httpClient.post(`${this.baseUrl}removecart/`,body,{headers: this.headers})
  }

  changeQuantity(data){
    const body=JSON.stringify(data)
    return this.httpClient.post(`${this.baseUrl}changequan/`,body,{headers: this.headers})
  }
}
