import {Component, OnDestroy, OnInit} from '@angular/core';
import {Machine} from "../../models/models";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {CompatClient, Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {Message} from "../../models/Message";
import {WS_ENDPOINT} from "../../app.constants";


@Component({
  selector: 'app-machine-search',
  templateUrl: './machine-search.component.html',
  styleUrls: ['./machine-search.component.css']
})
export class MachineSearchComponent implements OnInit, OnDestroy{

  machines: Machine[];
  searchMachineForm: FormGroup;
  hiddenField: boolean;
  canStartMachine: boolean;
  canStopMachine: boolean;
  canRestartMachine: boolean;

  // @ts-ignore
  stompClient: CompatClient;
  messages: Message[] = [];
  isConnected: boolean = false;


  constructor(private userService: UserService, private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.machines = [];
    this.hiddenField = false;
    this.searchMachineForm = this.formBuilder.group({
      name: [''], running: [''], stopped: [''],
      dateFrom: [''], dateTo: ['']
    })

    // @ts-ignore
    let decodedJWT = JSON.parse(window.atob(localStorage.getItem("token").split('.')[1]));
    this.canStartMachine = decodedJWT.permission.can_start_machines;
    this.canStopMachine = decodedJWT.permission.can_stop_machines;
    this.canRestartMachine = decodedJWT.permission.can_restart_machines;
  }

  public connect(): void {

    const jwt =  localStorage.getItem("token");
    console.log("this1");
   // const socket = new WebSocket(`http://localhost:8080/ws?jwt=${jwt}`);
   // const socket = new SockJS('http://localhost:8080/ws');
    console.log("this2")

    this.stompClient = Stomp.over(function () {
     // return new SockJS(`http://localhost:8080/ws?jwt=${jwt}`);
      return new SockJS(WS_ENDPOINT);
      }
    );
    console.log("this3")

    this.stompClient.connect({}, this.onConnect.bind(this));
  }

  onConnect(frame: any) {
    console.log("this")
    console.log(this)
    this.stompClient.subscribe('/machine-status/messages', this.addNewMessage.bind(this));
    this.isConnected = true;
  }

  addNewMessage(messageOutput: any) {
    const message = JSON.parse(messageOutput.body);

    if (message.machineId && message.newStatus) {
      this.updateMachineStatus(message.machineId, message.newStatus);
    }
  }

  updateMachineStatus(machineId: number, newStatus: string) {
    const machineToUpdate = this.machines.find((machine) => machine.machineId === machineId);

    if (machineToUpdate) {
      machineToUpdate.status = newStatus;
    }
  }

  disconnect() {
    if(this.stompClient != null) {
      this.stompClient.disconnect();
    }
    this.isConnected = false;
    console.log("Disconnected");
  }

  ngOnInit(): void {
    this.connect();
    this.userService.getActiveMachines().subscribe((machines) => {
      this.machines = machines;
    });
  }

  ngOnDestroy(): void {
    this.disconnect();
  }


  searchMachines(): void {
    let name = this.searchMachineForm.get('name')?.value;
    let dateFrom = this.searchMachineForm.get('dateFrom')?.value;
    let dateTo = this.searchMachineForm.get('dateTo')?.value;

    if ((!dateFrom && dateTo) || (dateFrom && !dateTo)) {
      this.hiddenField = true;
      return;
    }
    if (dateFrom) {
      let from: String[] = dateFrom.split('-');
      dateFrom = '' + from[1] + from[2] + from[0];
    }
    if (dateTo) {
      let to: String[] = dateTo.split('-');
      dateTo = '' + to[1] + to[2] + to[0];
    }

    this.userService.searchMachines(name, dateFrom, dateTo).subscribe((machines) => {
      this.machines = machines;
      this.hiddenField = false;
    }, error => {
      this.machines = [];
    });
  }

  startMachine(id: number, name: String) {
    // @ts-ignore
    let decodedJWT = JSON.parse(window.atob(localStorage.getItem("token").split('.')[1]));
    if (decodedJWT.permission.can_start_machines) {
      this.userService.startMachine(id).subscribe(() => {
        this.toastr.success('Starting in: 10 to 15s',  name + ' will be started.');

      }, error => {
        console.log(error.error);
        this.toastr.error(name + ' must be in a \'stopped\' state to be started.', 'Unable to start ' + name + '!');
      })
    }
  }

  restartMachine(id: number, name: String) {
    // @ts-ignore
    let decodedJWT = JSON.parse(window.atob(localStorage.getItem("token").split('.')[1]));
    if (decodedJWT.permission.can_restart_machines) {
      this.userService.restartMachine(id).subscribe(() => {
        this.toastr.success('Restart time: 5 to 7.5s',  name + ' will be restarted.');

      }, error => {
        console.log(error.error);
        this.toastr.error(name + ' must be in a \'running\' state to be restarted.', 'Unable to restart ' + name + '!');
      })
    }
  }

  stopMachine(id: number, name: String) {
    // @ts-ignore
    let decodedJWT = JSON.parse(window.atob(localStorage.getItem("token").split('.')[1]));
    if (decodedJWT.permission.can_stop_machines) {
      this.userService.stopMachine(id).subscribe(() => {
        this.toastr.success('Pauses the machine in 10 to 15s',  name + ' will be stopped.');

        }, error => {
        console.log(error.error);
        this.toastr.error(name + ' must be in a \'running\' state to be stopped.', 'Unable to stop ' + name + '!');
      })
    }
  }



}



