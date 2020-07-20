import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { DataService } from '../../services/data.service';
import * as jwt_decode from 'jwt-decode';




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  cart_items=[];
  subtotal:number=0;
  shipping:number=0;
  total:number=0;
  cartEmpty:boolean;

  //baseUrl="http://127.0.0.1:8000/";
  baseUrl="https://elite-in.herokuapp.com/";


  constructor(
    private cartService: CartService,
    private dataService : DataService
  ) { }

  ngOnInit() {
    this.dataService.user.subscribe(
      res => {
        var ctx = {
          'uemail' : res
        }
        this.cartService.getcartitem(ctx).subscribe(
          (result:any)=>{
            for(let i=0;i<result.length;i++){
              var dt=JSON.stringify(result[i]).split("").reverse().join("");
              result[i]=jwt_decode(dt)
            }
            this.cart_items= result;
            if(this.cart_items.length>0){
              this.cartEmpty=false;
            }
            else{
              this.cartEmpty=true;
            }
            for(let i of result){
              this.subtotal+=(i.quantity*i.product_price)
            }
            if(this.subtotal<=500 && this.subtotal>0){
              this.shipping=50
            }
            else{
              this.shipping=0
            }
            this.total=this.shipping+this.subtotal
          }
        )
      }
    )
  }
  removeitem(item){
    var ctx={
      "cartid":item.id
    }
    this.cartService.removecartitem(ctx).subscribe(
      res=>{
        console.log(res)
        location.href ="/cart"
      }
    )
  }

  changeQuantity(item,quan){
    var ctx={
      "cartid":item.id,
      "quantity":quan,
    }
    this.cartService.changeQuantity(ctx).subscribe(
      res=>{
        console.log(res)
        window.location.reload()
      }
    )
  }

}
