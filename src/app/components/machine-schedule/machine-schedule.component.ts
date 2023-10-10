import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-machine-schedule',
  templateUrl: './machine-schedule.component.html',
  styleUrls: ['./machine-schedule.component.css']
})
export class MachineScheduleComponent implements OnInit{
  machineId: number;
  scheduleActivityForm: FormGroup;
  canStartMachine: boolean;
  canStopMachine: boolean;
  canRestartMachine: boolean;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private route: ActivatedRoute, private toastr: ToastrService) {

    this.machineId = -1;

    // @ts-ignore
    let decodedJWT = JSON.parse(window.atob(localStorage.getItem("token").split('.')[1]));
    this.canStartMachine = decodedJWT.permission.can_start_machines;
    this.canStopMachine = decodedJWT.permission.can_stop_machines;
    this.canRestartMachine = decodedJWT.permission.can_restart_machines;

    this.scheduleActivityForm = formBuilder.group({
      date: ['', [Validators.required]],
      hour: ['', [Validators.required]],
      minute: ['', [Validators.required]],
      second: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  scheduleActivity(action: String): void {

    this.route.params.subscribe(params => {
      this.machineId = params['id'];
    });

    let dateFrom = this.scheduleActivityForm.get('date')?.value;
    console.log(dateFrom);  // 2023-09-05
    let hours = this.scheduleActivityForm.get('hour')?.value;
    let minutes = this.scheduleActivityForm.get('minute')?.value;
    let seconds = this.scheduleActivityForm.get('second')?.value;
    let date: number[] = dateFrom.split('-');
    let months: String[] = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULE", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];


    // @ts-ignore
    let decodedJWT = JSON.parse(window.atob(localStorage.getItem("token").split('.')[1]));
    this.userService.scheduleActivity(action, this.machineId, date[0], months[date[1] - 1], date[2], hours, minutes, seconds).subscribe(() => {
      this.toastr.success('Action is scheduled.', 'Scheduling successful!');
    }, error => {
      console.log(error.error);
      this.toastr.error('Action is not scheduled, incorrect date or time.', 'Scheduling failed!');
    })

  }
}
