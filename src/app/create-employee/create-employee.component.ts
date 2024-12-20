import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {


  employee: Employee = new Employee();
  profileImage: File | null = null;

  constructor(private employeeService: EmployeeService,
    private router: Router,
    private http: HttpClient,
    private datePipe: DatePipe) { }

  ngOnInit(): void { }


  goToEmployeeList() {
    this.router.navigate(['/employees']);
  }

  onSubmit() {

    this.employee.createdDate = new Date();

    this.employee.createdDateFormatted = this.employee.createdDate
      ? this.datePipe.transform(this.employee.createdDate, 'yyyy-MM-dd') ?? ''
      : '';


    console.log(new Date);

    const formData = new FormData();
    formData.append('name', this.employee.name.toString());
    formData.append('designation', this.employee.designation.toString());
    formData.append('salary', this.employee.salary.toString());

    if (this.profileImage) {
      formData.append('file', this.profileImage, this.profileImage.name);
    }

    formData.append('data', JSON.stringify(this.employee));
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    this.http.post<Employee>('http://localhost:1018/api/employees', formData, { headers }).subscribe(
      (response) => {
        console.log('Employee created successfully:', response);
        alert(JSON.stringify(response));
        this.goToEmployeeList();
      },
      (error) => {
        console.log('Error creating the employee: ', error);
      }
    );

  }



  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.profileImage = fileList[0]
    }
  }
}
