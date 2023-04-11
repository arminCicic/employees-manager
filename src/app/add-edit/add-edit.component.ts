import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: "",
      lastName: "",
      email: "",
      dob: "",
      gender:"",
      company: "",
      experience: "",
      package:"",

    })
  }

}
