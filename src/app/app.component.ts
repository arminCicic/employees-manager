import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from './add-edit/add-edit.component';
import { EmployeeService } from './services/employee.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './core/core.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'employees-managament';

  displayedColumns: string[] = [
    'id', 
    'firstName', 
    'lastName', 
    'email', 
    'doB',
    'gender', 
    'education', 
    'company', 
    'experience', 
     'action'
    ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor (private dialog: MatDialog, 
               private empService: EmployeeService,
               private coreService: CoreService) {}

  ngOnInit(): void {
    this.getEmployeeList()
  }

  openAddEditForm() {
    const dialogRef = this.dialog.open(AddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      }
    })
  }

  getEmployeeList() {
    this.empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      }, 
      error: (err) => {
        console.log(err)
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

 deleteEpmloyee(id:number) {
  this.empService.deleteEmployeeList(id).subscribe({
    next: (res) => {
     this.coreService.openSnackBar("Employee deleted", "done")
      this.getEmployeeList();
    },
    error: (err) => {
      console.log(err)
    } 
  })
 }

 openEditForm(data:any, id:any) {
 const dialogRef = this.dialog.open(AddEditComponent, {
    id: id,
    data: data,

  });
  dialogRef.afterClosed().subscribe({
    next: (val) => {
      if (val) {
        this.getEmployeeList();
      }
    }
  })
}
  

  
}
