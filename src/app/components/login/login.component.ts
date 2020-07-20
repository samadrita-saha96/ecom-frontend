import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../models/User';
import { RegisterService } from '../../services/register.service';
import * as jwt_decode from 'jwt-decode';


interface TokenModel {
  id: number;
  token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: boolean = true;
  forgot_password: boolean = false;
  invalid_cre: string = "";
  User_list: User[] = [];
  constructor(
    private loginService: LoginService,
    private router: Router,
    private dialogRef: MatDialogRef<LoginComponent>,
    private cookies: CookieService,
    private registerService: RegisterService,
  ) { }

  ngOnInit() {
    const mrtoken = this.cookies.get('mr-token');
    if (mrtoken) {
      console.log(mrtoken);
    }
    this.registerService.getUser().subscribe(
      (data) => {
        this.User_list = data;
      },
      error => console.log(error)
    );
  }

  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [Validators.required,])


  getErrorMessageEmail() {
    if (this.email.hasError('required')) {
      return 'You must enter Email';
    }
    return this.email.hasError('email') ? 'Invalid Email' : '';
  }
  getErrorMessagePassword() {
    if (this.email.hasError('required')) {
      return 'You must enter Password';
    }
    return '';
  }

  saveForm() {
    if (this.email.valid && this.password.valid) {
      var content = {
        "email": this.email.value,
        "password": this.password.value
      };
      this.loginService.loginUser(content).subscribe(
        (result: TokenModel) => {
          var res = JSON.stringify(result).split("").reverse().join("");
          result = jwt_decode(res)
          this.cookies.set('mr-token', result.token, 30, "/");
          var id = result.id;
          this.cookies.set('logged_in_user_id', `${id}`, 30, "/");
          location.href = "/home";
          this.dialogRef.close();
        },
        error => this.invalid_cre = "Invalid Credentials!"
      )
    }
  }

  forget_msg: string = "";
  no_mail: string = "";
  forgotpass() {
    if (this.email.valid) {
      var search: boolean
      for (let user of this.User_list) {
        if (this.email.value == user.email) {
          search = true;
          break;
        }
      }
      if (search) {
        var content = {
          'email': this.email.value,
        }
        this.loginService.passforget(content).subscribe(
          result => {
            this.forget_msg = "A link has been sent to your email";
          }
        )
      }
      else {
        this.no_mail = "This Email is not registered!"
      }

    }

  }
}
