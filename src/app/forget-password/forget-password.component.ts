import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../Services/snackbar.service';
import { UserService } from '../Services/user.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm:any = FormGroup;
  responseMessage:any;

  constructor(private formBuilder: FormBuilder, private userService : UserService, 
    private snackBar : SnackbarService, private dialogRef: MatDialogRef<ForgetPasswordComponent>) { }

  ngOnInit(): void {
    this.forgetPasswordForm = this.formBuilder.group({
      email: [null,[Validators.required,Validators.pattern(GlobalConstants.emailRegex)]]
    });
  }

  handleSubmit() {    
    let formData = this.forgetPasswordForm.value;
    let data = {
      email: formData.email
    }
    this.userService.forgetPassword(data).subscribe((response: any) => {
      console.log(data);
      this.responseMessage = response?.message;
      this.dialogRef.close();
      this.snackBar.openSnackBar(this.responseMessage,"");
    }, (error) => {
      if(error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBar.openSnackBar(this.responseMessage,GlobalConstants.error);
    });
  } 
}
