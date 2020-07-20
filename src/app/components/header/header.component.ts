import { Component, OnInit, HostListener, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { DataService } from '../../services/data.service';
import { CookieService } from 'ngx-cookie-service';
import { RegisterService } from '../../services/register.service';
import { LoginService } from '../../services/login.service';
import { User } from '../../models/User';
import { CartService } from '../../services/cart.service';
import * as jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public innerWidth;
  isSearch: boolean = false;
  logged_in_user: User;
  @Input() openSignin: boolean;

  @Input() inhome: boolean;
  @Input() incontact: boolean;
  @Input() inabout: boolean;
  @Input() inblog: boolean;
  @Input() insblog: boolean;

  open_catalog:boolean=false;

  mrtoken: string = "";
  User_list : User[] = [];
  auth_user : User;
  cart_items: any = [];
  itemno: number;


  constructor(
    private dialog: MatDialog,
    private dataService: DataService,
    private cookies: CookieService,
    private registerService: RegisterService,
    private loginService: LoginService,
    private cartService: CartService,
  ) { }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.mrtoken = this.cookies.get('mr-token');

    this.registerService.getUser().subscribe(
      (data: User[]) => {
        this.User_list = data;
      }
    )
    var Context = {
      "token": this.cookies.get('mr-token')
    }
    this.loginService.getUser(Context).subscribe(
      (result: User) => {
        var dt=JSON.stringify(result).split("").reverse().join("")
        result=jwt_decode(dt)
        this.logged_in_user = result;
        this.dataService.setUser(result.email)
        var ctx = {
          "uemail":this.logged_in_user.email
        }
        this.cartService.getcartitem(ctx).subscribe(
          (result:any) => {
            for(let i=0;i<result.length;i++){
              var dt=JSON.stringify(result[i]).split("").reverse().join("");
              result[i]=jwt_decode(dt)
            }
            this.cart_items = result
            var c=0
            for(var i=0;i<this.cart_items.length;i++){
              c+=this.cart_items[i].quantity
            }
            this.itemno=c
          }
        )
      },
    )
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '450px',
    });
  }

  registerpage() {
    location.href = "/account/register";
  }

  logout() {
    let context={
      'id':this.logged_in_user['id']
    }
    this.loginService.logoutUser(context).subscribe(
      res =>{
        console.log("Logout")
      },
      error=>console.log(error)
    );
    this.cookies.delete('mr-token',"/");
    this.cookies.delete('logged_in_user_id',"/");
    location.href = "/home";
    this.cart_items=[];
    this.itemno=0;
  }
}
