import {Component, OnInit} from '@angular/core';
import {Machine} from "../../models/models";
import {UserService} from "../../services/user.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-machine-destroy',
  templateUrl: './machine-destroy.component.html',
  styleUrls: ['./machine-destroy.component.css']
})
export class MachineDestroyComponent implements OnInit{

  machines: Machine[];

  constructor(private userService: UserService, private toastr: ToastrService) {
    this.machines = [];
  }

  ngOnInit(): void {
    this.userService.getActiveMachines().subscribe((machines) => {
      this.machines = machines;
    })
  }

  deleteMachine(machine: Machine): void {

    const confirmed = window.confirm("Do you really want to destroy this machine?");

    if (confirmed) {
      this.userService.destroyMachine(machine).subscribe(() => {
        this.userService.getActiveMachines().subscribe((machines) => {
          this.machines = machines;
          this.toastr.success('Machine destroyed successfully', 'Machine Destroyed');
        })
      }, error => {
        console.log(error.error);
        this.toastr.error("Cannot proceed with destruction as the machine is not in the STOPPED state.", 'Destroy Error');
      });

    } else {
      this.toastr.info('This machine was not destroyed.', 'Destroy action canceled');
    }

  }

}
