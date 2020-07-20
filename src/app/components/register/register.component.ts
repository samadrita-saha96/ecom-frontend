import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { User } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  accept:boolean= false;
  submitClicked:boolean=false;
  accept_msg:string="";
  box_clicked:boolean= false;
  User_list:User[]=[];
  
  
  regForm:FormGroup;
  first_namectrl:FormControl;
  last_namectrl:FormControl;
  emailctrl:FormControl;
  passwordctrl:FormControl;
  password_confirmctrl:FormControl;
  constructor(
    private dialog:MatDialog,
    private registerService: RegisterService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.first_namectrl=new FormControl('',[Validators.required]);
    this.last_namectrl= new FormControl('',[Validators.required]),
    this.emailctrl= new FormControl('',[Validators.required,Validators.email]),
    this.passwordctrl= new FormControl('',[Validators.required,Validators.minLength(8)]),
    this.password_confirmctrl = new FormControl('',[Validators.required]),

    this.regForm = new FormGroup({
      first_name:this.first_namectrl,
      last_name:this.last_namectrl,
      email:this.emailctrl,
      password:this.passwordctrl,
      passwordConfirm:this.password_confirmctrl      
    });

    this.registerService.getUser().subscribe(
      (data) =>{
        this.User_list=data;
      }, 
      error=>console.log(error)
    );
    
  }

  openSignin() {
    const dialogRef = this.dialog.open(LoginComponent, { 
      width: '450px',
    });
  }
  
  first_name_error:string="";
  last_name_error:string="";
  email_error:string="";
  password_error:string="";
  cpassword_error:string="";

  getErrorMessage() {
    if(this.first_namectrl.hasError('required')){
      this.first_name_error="First Name Is Required!";
    }
    
    if(this.last_namectrl.hasError('required')){
      this.last_name_error="Last Name Is Required!";
    }
    if(this.emailctrl.hasError('email')){
      this.email_error="Invalid Email!";
    }
    else if(this.emailctrl.hasError('required')){
      this.email_error="Email Is Required!";
    }
    if(this.passwordctrl.hasError('required')){
      this.password_error="Password Is Required!";
    }
    else if(this.regForm.get('password').value.length<8){
      this.password_error="Password Must Contain Min 8 Characters!";
    }
    if(this.password_confirmctrl.hasError('required')){
      this.cpassword_error="Password Not Matching!";
    }
  }
  change(){
    this.box_clicked=!this.box_clicked;
    this.accept=!this.accept;
  }
  cpass(){
    if(this.regForm.get('password').value!=this.regForm.get('passwordConfirm').value){
      return "Password not matched";
    }
    return "";
  }
  email_send:string=""
  saveForm(){
    this.submitClicked=true;
    if(!this.accept){
      this.accept_msg="Please check the box";
    }
    else{
      this.accept_msg="";
      if(this.regForm.valid){
        this.email_send="A email has been sent to the given email address"
        this.registerService.registerUser(this.regForm.value).subscribe(
          result => {
            location.href = "/home";
          },
          error => console.log(error)
        );
      
      }
    }    
  }
  
  findUserName(){
    var Email = this.regForm.get('email').value;
    for(var user of this.User_list){
      if(Email==user.email){
        return "An Already Exists With This Email";
      }
    }
    return "";
  }

}
