import { Component, OnInit, HostListener } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductModel } from 'src/app/models/Product';
import * as jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public innerWidth;
  inhome = true;
  latestproduct:ProductModel[]=[];
  cat_arr:string[]=["mens-clothing","womens-clothing","kids-clothing"]
  sub_arr:string[]=["t-shirt","casual-shirt","formal-shirt","","","","","suits","blazer","waistcoat","casual-trouser","formal-trouser","jeans","track-pant","three-fourth","shorts","cargos","kurtas","sherwanis","dhoti","ethenic-sets","ethenic-pajamas","nehru-jackets"]
  //baseUrl="http://127.0.0.1:8000/";
  baseUrl="https://elite-in.herokuapp.com/"
  constructor(
    private productService:ProductService,
  ) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.productService.getlatestproduct().subscribe(
      (result:ProductModel[]) => {
        for(let i=0;i<result.length;i++){
          var dt=JSON.stringify(result[i]).split("").reverse().join("");
          result[i]=jwt_decode(dt)
        }
        this.latestproduct=result; 
        console.log(this.latestproduct[0])       
      },
      error => console.log(error)
    )
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  openprod(pname){
    pname = pname.replace(/ /g,'_')
    return pname
  }
  
  
}
