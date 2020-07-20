import { Component, OnInit, HostListener } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../models/Product';
import { User } from '../../models/User';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from '../../services/cart.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  product_name;
  innerWidth;
  img_src:string=""
  img_id:number;
  size_id:number=1;
  size = ['S','M','L','XL']
  user_email:string;
  constructor(
    private productService:ProductService,
    private route:ActivatedRoute,
    private loginService: LoginService,
    private cookies : CookieService,
    private cartService: CartService,
  ) { 
    this.route.params.subscribe(
      params =>  this.product_name={'pname':params.prod_name}
    );
    // console.log(this.product_name)
  }
  singleProduct: ProductModel[]=[]

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.productService.getProductByName(this.product_name).subscribe(
      (result:ProductModel[]) => {
        for(let i=0;i<result.length;i++){
          var dt=JSON.stringify(result[i]).split("").reverse().join("");
          result[i]=jwt_decode(dt)
        }
        this.singleProduct=result
        this.img_src=`${this.singleProduct[0].img1}`
        this.img_id=1 
      },
      error=> console.log(error)
    );

    var Context = {
      "token": this.cookies.get('mr-token')
    }
    
    this.loginService.getUser(Context).subscribe(
      
      (result: User)=> {
        var dt=JSON.stringify(result).split("").reverse().join("")
        result=jwt_decode(dt)
        this.user_email=result.email
      }
    )
    
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  openimg1(){
    this.img_src=`${this.singleProduct[0].img1}`
    this.img_id=1
  }
  openimg2(){
    this.img_src=`${this.singleProduct[0].img2}`
    this.img_id=2
  }
  openimg3(){
    this.img_src=`${this.singleProduct[0].img3}`
    this.img_id=3
  }

  carted(prod:ProductModel){
    var context={
      'product_name': prod.product_name,
      'user' : this.user_email,
      'size': this.size[this.size_id-1],
      'quantity' : 1,
      'price': prod.price,
      'img': prod.img1
    }
    console.log(context)
    this.cartService.addtocart(context).subscribe(
      result => {
        console.log(result)
      }
    )
    var crtUrl=window.location.href
    location.href = crtUrl
  }
}
