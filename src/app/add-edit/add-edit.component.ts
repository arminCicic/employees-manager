import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit{

  form: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ];
  

  constructor(private fb: FormBuilder, 
              private empService: EmployeeService, 
              private dialogRef: MatDialogRef<AddEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private coreService: CoreService) {
      this.form = this.fb.group({
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      gender:"",
      education:"",
      company: "",
      experience: "",
      package:"",

    })
  }

  ngOnInit(): void {
    this.form.patchValue(this.data)
  }

  onFormSubmit () {
    if (this.form.valid) {
      if (this.data) {
        this.empService.updateEmployee(this.data.id, this.form.value).subscribe({
          next: (val:any) => {
            this.coreService.openSnackBar("Employee information updated")
            this.dialogRef.close(true);
          }, 
          error: (err:any) => {
            console.error(err)
          }
  
        })
      } else {
        this.empService.addEmployee(this.form.value).subscribe({
          next: (val:any) => {
            this.coreService.openSnackBar("Employee added")
            this.dialogRef.close(true);
          }, 
          error: (err:any) => {
            console.error(err)
          }
  
        })
      }
    }
  }

}
