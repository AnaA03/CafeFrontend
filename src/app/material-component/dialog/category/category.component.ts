import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/Services/category.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();
  categoryForm: any = FormGroup;
  dialogAction: any = 'Add';
  action: any = "Add";
  responseMessage: any;


  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any, private formBuilder: FormBuilder,
  private categoryService: CategoryService, 
  private dialogRef:MatDialogRef<CategoryComponent>,
  private snackBar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name:[null,[Validators.required]]
    });
    if(this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.categoryForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit(){
    if( this.dialogAction === 'Edit') {
      this.edit();
    }
    else {
      this.add();
    }
  }

  add() {
    let formData = this.categoryForm.value;
    let data = {
      name:formData.name
    }
    this.categoryService.add(data).subscribe((response:any) => {
        this.dialogRef.close();
        this.onAddCategory.emit();
        this.responseMessage = response.message;
        this.snackBar.openSnackBar(this.responseMessage,"Success");
    }, (error:any) => {
      this.dialogRef.close();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBar.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  edit(){
    let formData = this.categoryForm.value;
    let data = {
      id: this.dialogData.data.id,
      name:formData.name
    }
    this.categoryService.update(data).subscribe((response:any) => {
      console.log(data.id);
        this.dialogRef.close();
        this.onEditCategory.emit();
        this.responseMessage = response.message;
        this.snackBar.openSnackBar(this.responseMessage,"Success");
    }, (error:any) => {
      this.dialogRef.close();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackBar.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }
}
