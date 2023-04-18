import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
        this.form = this.fb.group (
          {
            id: new FormControl(''),
            firstName: new FormControl('', [Validators.required]),
            lastName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            doB: new FormControl('', [Validators.required, this.dateOfBirthValidator]),
            gender:new FormControl('', [Validators.required]),
            education:new FormControl('', [Validators.required]),
            company: new FormControl('', [Validators.required]),
            experience: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
          }
          )
              }

              dateOfBirthValidator(control: AbstractControl): { [key: string]: any } | null {
                const selectedDate = new Date(control.value);
                const currentDate = new Date();
            
                if (selectedDate.getTime() > currentDate.getTime()) {
                  return { 'futureDate': true };
                }
                return null;
              }


  // initializeForm() {
    
  // }

  ngOnInit(): void {
    this.form.patchValue(this.data)
    // this.initializeForm();
  }

  onFormSubmit () {
    if (this.form.valid) {
      if (this.data) {
        this.empService.updateEmployee(this.form.value).subscribe({
         
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
            console.log(this.form.value)
          }, 
          error: (err:any) => {
            console.error(err)
          }
  
        })
      }
    }
  }

}
