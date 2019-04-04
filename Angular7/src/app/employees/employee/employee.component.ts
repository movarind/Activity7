import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service :EmployeeService,
    private toastr : ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }


  resetForm(form?: NgForm){
    if (form!=null)
    form.resetForm();
    this.service.formData ={
      EmployeeID:null,
      FullName:'',
      Position:'',
      EMPCode:'',
      Mobile:''
    }
  }
onSubmit(form :NgForm){
  if(form.value.EmployeeID ==null)
this.insertRecord(form);
else
this.updateRecord(form); 
}
insertRecord(form :NgForm){
this.service.postEmployee(form.value).subscribe(res => {
  this.toastr.success('Insert Successful','Emp.Register');
this.resetForm(form);
this.service.refreshList();
});
}
updateRecord(form :NgForm){
  this.service.putEmployee(form.value).subscribe(res => {
    this.toastr.warning('Updated Successful','Emp.Register');
  this.resetForm(form);
  this.service.refreshList();
  });

}
}

 