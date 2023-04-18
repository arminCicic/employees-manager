import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http:HttpClient) { }

  public addEmployee(data: any): Observable<any> {
    // data.id = undefined;
    return this._http.post("https://localhost:7054/api/EmployeesManager", data)
  }

 public updateEmployee(data: any): Observable<any> {
    return this._http.put("https://localhost:7054/api/EmployeesManager", data);
  }

public  getEmployeeList(): Observable<any> {
    return this._http.get("https://localhost:7054/api/EmployeesManager")
  }

public  deleteEmployeeList(id: number): Observable<any> {
    return this._http.delete(`https://localhost:7054/api/EmployeesManager/${id}`)
  }

}

