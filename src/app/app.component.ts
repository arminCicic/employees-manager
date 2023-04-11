import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './add-edit/add-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'employees-managament';

  constructor (private dialog: MatDialog) {}

  openAddEditForm() {
    this.dialog.open(AddEditComponent)
  }
}
