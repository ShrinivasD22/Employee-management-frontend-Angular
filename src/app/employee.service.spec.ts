import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';
import { TmplAstHoverDeferredTrigger } from '@angular/compiler';

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
 TmplAstHoverDeferredTrigger