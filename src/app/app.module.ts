import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';




@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    CreateEmployeeComponent,
    UpdateEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDialogModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
