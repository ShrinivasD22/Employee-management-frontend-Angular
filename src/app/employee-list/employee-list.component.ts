import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = []; // Initialize as an empty array
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;
  searchTerm: string = '';
  sortDirection: string = 'asc';
  sortColumn: string = 'name';

  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.loadEmployees(); // Load employees initially
  }

   // Method to fetch employees with pagination
   loadEmployees(): void {
    console.log("load employees called");
    this.employeeService.getEmployeesWithDepartment().subscribe(
      (response: any) => {
        console.log('API Response:', response); // Print the full response
        this.employees = response; // Assuming the data is in the `content` property
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
      },
      (error: any) => {
        console.error('Error while loading employees:', error);
      }
    );
  }

  // Method for searching employees
  // searchEmployee(data: any): void {
  //   setTimeout(() => {
  //     if (data !== '') {
  //       this.employeeService.searchEmployees(data).subscribe({
  //         next: (data: any) => {
  //           if (data) {
  //             this.employees = data.content;
  //             this.totalPages = data.totalPages;
  //             this.totalElements = data.totalElements;
  //           }
  //         },
  //         error: (err: any) => {
  //           alert(err.error.message);
  //         }
  //       });
  //     } else {
  //       this.loadEmployees(); // Load all employees if search term is empty
  //     }
  //   }, 500);
  // }

  searchEmployee(data: any): void {
    setTimeout(() => {
      if (data !== '') {
        // Check if data is likely a department ID
        if (this.isDepartmentId(data)) {
          this.employeeService.getEmployeesByDepartment(data).subscribe({
            next: (employees: any[]) => {
              this.employees = employees; // Assign the list of employees directly
            },
            error: (err: any) => {
              alert(err.error.message); // Handle errors
            }
          });
        } else {
          this.employeeService.searchEmployees(data).subscribe({
            next: (data: any) => {
              this.employees = data.content; // Handle general search results
            },
            error: (err: any) => {
              alert(err.error.message); // Handle errors
            }
          });
        }
      } else {
        this.loadEmployees(); // Load all employees if no search term is provided
      }
    }, 500);
  }

  // Helper method to validate department ID
  private isDepartmentId(data: any): boolean {
    // Regex for alphanumeric format like 'dept01'
    return /^[a-zA-Z]+[0-9]+$/.test(data);
  }




























  // Method for pagination
  onPageChange(page: string | number): void {
    if (page === 'Previous' && this.currentPage > 0) {
      this.currentPage--;
    } else if (page === 'Next' && this.currentPage < this.totalPages - 1) {
      this.currentPage++;
    } else if (typeof page === 'number') {
      this.currentPage = page;
    }

    this.loadEmployees(); // Reload employees based on the page change
  }

  // Method to handle employee update
  updateEmployee(id: number): void {
    this.router.navigate(['update-employee', id]);
  }

  // Method to handle employee deletion
  // deleteEmployee(id: number): void {
  //   const isConfirmed = window.confirm("Do you really want to delete this employee?");
  //   if (isConfirmed) {
  //     this.employeeService.deleteEmployee(id).subscribe((data: any) => {
  //       alert(data.message);
  //       this.loadEmployees(); // Reload the employee list after deletion
  //     });
  //   } else {
  //     console.log("Deletion cancelled by the user.");
  //   }
  // }


  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        alert('Employee deleted successfully');
        this.loadEmployees(); // Reload employee list after deletion
      },
      error: (err: any) => {
        console.log('Error:', err);
        const errorMessage = err?.error?.message || 'An unexpected error occurred while deleting the employee.';
        alert(errorMessage);
      }
    });
  }

  // Method to generate an array for pagination
  pagesArray(): number[] {
    return new Array(this.totalPages).fill(0).map((_, index) => index);
  }


   // Method to handle report download
   downloadReport() {
    this.employeeService.downloadEmployeeReport().subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        link.download = 'EmployeeReport.pdf'; // The default file name
        link.click();
        window.URL.revokeObjectURL(url);
      },
      (error: any) => {
        console.error('Error downloading report:', error);
        alert('Failed to download report');
      }
    );
  }
}
