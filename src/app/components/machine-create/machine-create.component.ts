import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-machine-create',
  templateUrl: './machine-create.component.html',
  styleUrls: ['./machine-create.component.css']
})
export class MachineCreateComponent implements OnInit{

  createMachineForm: FormGroup;
  machineCreatedSuccessfully = false;
  hiddenField: boolean;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.hiddenField = false;
    this.createMachineForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      isActive: ['']
    })
  }

  ngOnInit(): void {
  }

  createMachine() {
    let name = this.createMachineForm.get('name')?.value;
    let isActive = this.createMachineForm.get('isActive')?.touched;

    this.userService.createMachine(name, isActive).subscribe(() => {

      this.toastr.success('Machine created successfully!', 'Machine Creation Success');

      this.hiddenField = false;
      this.createMachineForm.reset();
    }, error => {
      console.log(error.error);
      this.hiddenField = true;
    })
  }

}
