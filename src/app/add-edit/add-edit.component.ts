import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent {

  form: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ];
  

  constructor(private fb: FormBuilder, private empService: EmployeeService, private dialogRef: MatDialogRef<AddEditComponent>) {
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

  onFormSubmit () {
    if (this.form.valid) {
      this.empService.addEmployee(this.form.value).subscribe({
        next: (val:any) => {
          alert("Employee added successfuly");
          this.dialogRef.close(true);
        }, 
        error: (err:any) => {
          console.error(err)
        }

      })
    }
  }

}
