import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormGroup,FormControl, Validators} from '@angular/forms';
import { CheckoutService } from '../../services/checkout.service';
import { CookieService } from 'ngx-cookie-service';
import { AddressModel } from '../../models/AddressModel';
import { CartService } from '../../services/cart.service';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/User';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  newaddress:FormGroup;
  fullnamectrl:FormControl;
  countryctrl:FormControl;
  statectrl:FormControl;
  housenumberctrl:FormControl;
  streetctrl:FormControl;
  landmarkctrl:FormControl;
  cityctrl:FormControl;
  pinctrl:FormControl;
  mobilectrl:FormControl;
  preferencesctrl:FormControl;
  submitClicked:boolean=false;
  accept:boolean=false;

  //Error Messages

  fullnameerror:string="! Please enter a name";
  countryerror:string="! Please select your country";
  stateerror:string = "! Please select your state";
  streeterror:string = "! please enter an address";
  cityerror:string="! Please enter a city name";
  pinerror:string="! Please enter a pin code";
  mobileerror:string="! Please enter a phone number so we can contact you.";
  preferenceserror:string="! Please select your address type.";

  loggedUser:string;
  logged_address:AddressModel[]=[];
  id_for_hr:number;

  subtotal:number=0;
  total:number=0;
  cart_items=[];
  shipping:number=0;
  constructor(
    private checkoutService:CheckoutService,
    private cookies : CookieService,
    private cartService: CartService,
    private loginService: LoginService,
    private router: Router,
  ) { }
  handler:any = null;
  selectAddress:AddressModel=null;
  paymentMethod:number=0; //1.Debit/Credit Card 2.Paytm 3.COD
  ngOnInit() {
    if(!this.cookies.get('mr-token')){
      this.router.navigate(['/home'])
    }
    this.loadStripe();
    var Context = {
      "token": this.cookies.get('mr-token')
    }
    this.loginService.getUser(Context).subscribe(
      (res:User) => {
        var ctx = {
          'uemail' : res.email
        }
        this.cartService.getcartitem(ctx).subscribe(
          (result:any)=>{
            this.cart_items= result;
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

    this.loggedUser=this.cookies.get('logged_in_user_id')

    let ctx ={
      'uid':this.loggedUser
    }
    this.checkoutService.getAddress(ctx).subscribe(
      (result:AddressModel[]) =>{
        for(let i=0;i<result.length;i++){
          var dt=JSON.stringify(result[i]).split("").reverse().join("");
          result[i]=jwt_decode(dt)
        }
        console.log(result)
        this.logged_address = result
        this.id_for_hr=this.logged_address.length-1
      },
      error => console.log(error)
    )
    

    this.fullnamectrl=new FormControl('',[Validators.required]);
    this.countryctrl=new FormControl('',[Validators.required]);
    this.statectrl=new FormControl('',[Validators.required]);
    this.housenumberctrl=new FormControl('');
    this.streetctrl=new FormControl('',[Validators.required]);
    this.landmarkctrl=new FormControl('');
    this.cityctrl=new FormControl('',[Validators.required]);
    this.pinctrl=new FormControl('',[Validators.required,Validators.minLength(6)]);
    this.mobilectrl=new FormControl('',[Validators.required,Validators.minLength(10)]);
    this.preferencesctrl=new FormControl('',[Validators.required]);

    this.newaddress = new FormGroup({
      fullname:this.fullnamectrl,
      country:this.countryctrl,
      state:this.statectrl,
      housenumber:this.housenumberctrl,
      street:this.streetctrl,
      landmark:this.landmarkctrl,
      city:this.cityctrl,
      pin:this.pinctrl,
      mobile:this.mobilectrl,
      preferences:this.preferencesctrl,
    })

  }
  addnew(){
    this.submitClicked=true;
    if(this.newaddress.valid){
      var ctx = {
        'user': this.loggedUser
      }
      var ct=Object.assign(ctx,this.newaddress.value)
      this.checkoutService.newAddress(ct).subscribe(
        res=>{
          window.location.reload()
        },
        error => console.log(error)
      )

    }
  }
  addressError:boolean;
  public addressfinal() {
    if(this.selectAddress){
      this.addressError=false;
      let element=document.getElementById('totalcart');
      element.scrollIntoView({ behavior: 'smooth',block: 'start' });
    }
    else{
      this.addressError=true;
    }
  }


pay(amount) {

  var handler = (<any>window).StripeCheckout.configure({
    key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
    locale: 'auto',
    token: function (token: any) {
      // You can access the token ID with `token.id`.
      // Get the token ID to your server-side code for use.
      console.log(token);
      
      var result = confirm( "Payment Successful!!" );
      if(result){
        location.href = "/home"
      }
      else{
        location.href = "/home"
      }
      
    }
  });

  handler.open({
    name: 'Debit/Credit Card',
    description: '4242 4242 4242 4242',
    amount: amount * 100
  });

}

loadStripe() {

  if(!window.document.getElementById('stripe-script')) {
    var s = window.document.createElement("script");
    s.id = "stripe-script";
    s.type = "text/javascript";
    s.src = "https://checkout.stripe.com/checkout.js";
    s.onload = () => {
      this.handler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
        locale: 'auto',
        token: function (token: any) {
          // You can access the token ID with `token.id`.
          // Get the token ID to your server-side code for use.
          console.log(token)
          alert('Payment Success!!');
          
        }
      });
    }

    window.document.body.appendChild(s);
  }
}
async delay(ms: number) {
  await new Promise(resolve => setTimeout(()=>resolve(), ms));
}

placeOrder(){
  console.log(this.selectAddress)
  if(this.paymentMethod==1){
    this.pay(this.total)
    this.removeitem()
  }
  else if(this.paymentMethod==3){
    this.delay(3500).then(
      any=>{
        this.removeitem()
        location.href ="/home"
      }
    )
  }
  
}
checkChange(){
  this.accept=!this.accept
}

removeitem(){
  var ctx={
    'uid':this.loggedUser
  }
  this.cartService.removecartitem(ctx).subscribe(
    res=>{
      console.log(res)
    },
    error=> console.log(error)
  )
}
}
