import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = "http://localhost:8080/api/employees/with-department";


  constructor(private httpClient: HttpClient,private http: HttpClient) { }


  // getPaginatedEmployees(page: number, size: number): Observable<{data:Employee[], totalPages:number}> {
  //   const params = new HttpParams()
  //     .set('page', page.toString())
  //     .set('size', size.toString());

  //   return this.httpClient.get<{ data:Employee[], totalPages: number}>(`${this.baseURL}/`, { params });
  // }

  private apiUrl2 = 'http://localhost:8080/api/employees/employees';

  getdataWithPagination(page:number,size:number):Observable<any>{
   return this.httpClient.get(`${this.baseURL}/?page=${page}&size=${size}`)
  }

  getEmployeesList(): Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${this.baseURL}`);
  }

  getEmployeesWithDepartment(): Observable<Employee[]> {
    const apiUrl = 'http://localhost:8080/api/employees/with-department';
    return this.httpClient.get<Employee[]>(apiUrl);
  }

  searchEmployees(data: string): Observable<any> {
    const url = `${this.baseURL}/search?data=${data}`;
    return this.httpClient.get(url);
  }
  getEmployeeImage(id: number): Observable<Blob> {
    return this.httpClient.get(`${this.baseURL}/employees/${id}/image`, { responseType: 'blob' });
  }

  createEmployee(formData:FormData){
    return this.httpClient.post<any>(`${this.baseURL}`, formData);
  }

  getEmployeeById(employeeId: string): Observable<Employee> {
    const apiUrl = `http://localhost:8080/api/employees/${employeeId}`;
    return this.httpClient.get<Employee>(apiUrl); // Change from Employee[] to Employee
  }


  getEmployeesByDepartment(departmentId: string): Observable<Employee[]> {
    const apiUrl = `http://localhost:8080/api/employees/department/${departmentId}`;
    return this.httpClient.get<Employee[]>(apiUrl);
  }


  updateEmployee(id: number, employee: Employee): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, employee)
  }

  deleteEmployee(id: number): Observable<Object> {
    const url = `http://localhost:8080/api/employees/${id}`;
    return this.httpClient.delete(url);
  }

  // Method to download the report
  // Method to download the report
  downloadEmployeeReport(): Observable<Blob> {
    return this.http.get<Blob>(this.apiUrl2, {  // Explicitly tell TypeScript the response type is 'Blob'
      responseType: 'blob' as 'json',  // Telling Angular to expect 'blob' response
      headers: new HttpHeaders({
        'Accept': 'application/pdf'  // Expecting PDF response
      })
    });
  }



}
