import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../Services/user.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private _dialog:MatDialog, private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') != null) {
      this.userService.checkToken().subscribe((response:any) => {
        this.router.navigate(['cafe/dashboard']);
      }, (error:any) => {
        console.log(error);
      })
      
    }
  }
  signupAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this._dialog.open(SignupComponent,dialogConfig);
  }
  forgetPasswordAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this._dialog.open(ForgetPasswordComponent,dialogConfig);
  }
  loginAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this._dialog.open(LoginComponent,dialogConfig);

  }

}
