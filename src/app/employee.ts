import { Data } from "@angular/router";
import { FileHandle } from "./file-handle";

export class Employee {
    id? : number;
    empImage: FileHandle[] = [];
    name : string = "";
    designation : String = "";
    salary : string = "";
    createdDate: Date = new Date();
    createdDateFormatted: string = " ";
}
