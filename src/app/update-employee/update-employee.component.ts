import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Employee } from '../employee';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  employee = {
    id: '',
    name: '',
    email: '',
    position: '',
    salary: '',
    departmentId: ''
  };

  id: string | null = null; // Updated ID type to string

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; // ID is now a string
      this.loadEmployeeDetails();
    });
  }

  loadEmployeeDetails(): void {
    if (this.id) {
      this.employeeService.getEmployeeById(this.id).subscribe(
        (response: any) => {
          // Map the response to match the employee object structure
          this.employee = {
            id: response.id,
            name: response.name,
            email: response.email,
            position: response.position,
            salary: response.salary,
            departmentId: response.departmentId
          };
        },
        (error) => {
          console.error('Error while loading employee details:', error);
        }
      );
    }
  }

  onSubmit(): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Prepare the JSON payload
    const payload = {
      name: this.employee.name,
      email: this.employee.email,
      position: this.employee.position,
      salary: this.employee.salary,
      departmentId: this.employee.departmentId
    };

    // Make the HTTP PUT request to update the employee
    this.http.put<any>(`http://localhost:8080/api/employees/${this.id}`, payload, { headers }).subscribe(
      (response) => {
        console.log('Employee updated successfully:', response);
        alert('Employee updated successfully!');
        this.goToEmployeeList();
      },
      (error) => {
        console.error('Error updating employee:', error);
      }
    );
  }

  goToEmployeeList(): void {
    this.router.navigate(['/employees']);
  }
}
