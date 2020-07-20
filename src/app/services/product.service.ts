import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private httpClient:HttpClient
  ) { }

  //baseUrl="http://127.0.0.1:8000/";
  baseUrl="https://elite-in.herokuapp.com/";

  headers=new HttpHeaders({
    'Content-Type': 'application/json',
  })

  getProductbysub(sub_id){
    const body=JSON.stringify(sub_id)
    return this.httpClient.post(`${this.baseUrl}productbysub/`, body, {headers: this.headers});
  }
  getProductByName(prod_name){
    
    const body=JSON.stringify(prod_name)
    return this.httpClient.post(`${this.baseUrl}productbyname/`, body, {headers: this.headers})
  }
  getSingleProduct(product_id){
    const body=JSON.stringify(product_id)
    return this.httpClient.post(`${this.baseUrl}singleproduct/`, body, {headers: this.headers});
  }
  getlatestproduct(){
    return this.httpClient.get(`${this.baseUrl}latestproduct/`, {headers: this.headers});
  }

}
