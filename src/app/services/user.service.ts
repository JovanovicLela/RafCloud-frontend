import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ErrorMessage, LoginResponse, Machine, UserUpdate} from "../models/models";
import {
  CREATE_MACHINE_ENDPOINT,
  CREATE_USER_ENDPOINT,
  DELETE_USER_ENDPOINT,
  DESTROY_MACHINE_ENDPOINT,
  GET_ACTIVE_MACHINES_ENDPOINT,
  GET_ERROR_MESSAGES_ENDPOINT, GET_USER_EMAIL_ENDPOINT,
  GET_USERS_ENDPOINT,
  LOGIN_ENDPOINT,
  RESTART_MACHINE_ENDPOINT,
  SCHEDULE_MACHINE_ENDPOINT,
  SEARCH_MACHINES_ENDPOINT,
  START_MACHINE_ENDPOINT,
  STOP_MACHINE_ENDPOINT, UPDATE_USER_ENDPOINT
} from "../app.constants";
import {AbstractControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  loginUser(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(LOGIN_ENDPOINT, {
      email: email,
      password: password
    });
  }

  logout(): void {
    localStorage.clear();
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  getUsers(): Observable<UserUpdate[]> {
    return this.httpClient.get<UserUpdate[]>(GET_USERS_ENDPOINT, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    });
  }

  deleteUser(email: String): Observable<null> {
    return this.httpClient.delete<null>(DELETE_USER_ENDPOINT+ `${email}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    });
  }

  createUser(name: string, lastname: string, email: string, password: string, can_read: undefined | boolean, can_update: undefined | boolean, can_create_users: undefined | boolean, can_delete: undefined | boolean, can_search: boolean | undefined,
             can_start: undefined | boolean, can_restart: undefined | boolean, can_stop: undefined | boolean, can_create_machines: undefined | boolean, can_destroy: undefined | boolean): Observable<any> {
    return this.httpClient.post<any>(CREATE_USER_ENDPOINT, {
      name: name, lastname: lastname,
      email: email, password: password,
      permission: {
        can_read_users: can_read, can_create_users: can_create_users, can_update_users: can_update, can_delete_users: can_delete,
        can_search_machines: can_search, can_start_machines: can_start, can_restart_machines: can_restart, can_stop_machines: can_stop,
        can_create_machines: can_create_machines, can_destroy_machines: can_destroy,
      }
    }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    });
  }

  updateUser(userId: number | undefined, name: AbstractControl | null, lastname: AbstractControl | null, email: string, password: AbstractControl | null, permissionId: number | undefined, can_read: undefined | boolean, can_update: undefined | boolean, can_create_users: undefined | boolean, can_delete: undefined | boolean, can_search: boolean | undefined,
             can_start: undefined | boolean, can_stop: undefined | boolean, can_restart: undefined | boolean, can_create_machines: undefined | boolean, can_destroy: undefined | boolean): Observable<any> {
    return this.httpClient.put<any>(UPDATE_USER_ENDPOINT, {
      userId: userId, name: name, lastname: lastname,  email: email, password: password,
      permission: {
        permissionId: permissionId,
        can_read_users: can_read, can_update_users: can_update,
        can_create_users: can_create_users, can_delete_users: can_delete,
        can_search_machines: can_search, can_start_machines: can_start, can_stop_machines: can_stop, can_restart_machines: can_restart,
        can_create_machines: can_create_machines, can_destroy_machines: can_destroy,
      }
    }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    });
  }

  getUser(email: string): Observable<UserUpdate> {
    return this.httpClient.get<UserUpdate>(GET_USER_EMAIL_ENDPOINT + `${email}`, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    })
  }


  createMachine(name: String, isActive: undefined | boolean): Observable<any> {
    return this.httpClient.post<any>(CREATE_MACHINE_ENDPOINT, {
      active: isActive,
      name: name
    }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    });
  }

  getActiveMachines(): Observable<Machine[]> {
    return this.httpClient.get<Machine[]>(GET_ACTIVE_MACHINES_ENDPOINT, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    });
  }

  destroyMachine(machine: Machine): Observable<any> {
    return this.httpClient.put<any>(DESTROY_MACHINE_ENDPOINT, {
      machineId: machine.machineId,
      active: machine.active,
      status: machine.status,
      name: machine.name,
      creationDate: machine.creationDate
    }, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    });
  }

  searchMachines(name: String, dateFrom: String, dateTo: String): Observable<any> {
    let reqParams: String = '';
    if (name.trim()) reqParams+= '?name='+ name;

    if (dateFrom && dateTo) {
      if (reqParams.includes('?'))
        reqParams += '&dateFrom=' + dateFrom + '&dateTo=' + dateTo;
      else
        reqParams += '?dateFrom=' + dateFrom + '&dateTo=' + dateTo;
    }
    console.log(reqParams);

    return this.httpClient.get<any>(SEARCH_MACHINES_ENDPOINT + reqParams, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    });
  }

  startMachine(machineId: number): Observable<any> {
    return this.httpClient.put<any>(START_MACHINE_ENDPOINT+ `${machineId}`, {},
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
      });
  }

  restartMachine(machineId: number): Observable<any> {
    return this.httpClient.put<any>( RESTART_MACHINE_ENDPOINT+ `${machineId}`, {},
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
      });
  }

  stopMachine(machineId: number): Observable<any> {
    return this.httpClient.put<any>(STOP_MACHINE_ENDPOINT+ `${machineId}`, {},
      {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        }
      });
  }

  getErrorMessages(): Observable<ErrorMessage[]> {
    return this.httpClient.get<ErrorMessage[]>(GET_ERROR_MESSAGES_ENDPOINT, {
      headers: {
       'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    });
  }

  scheduleActivity(action: String, machineId: number, year: number, month: String, day: number, hour: number, minute: number, second: number): Observable<any>{
    return this.httpClient.put<any>(SCHEDULE_MACHINE_ENDPOINT + `${action}/${machineId}`, {
      year: year, month: month, day: day, hour: hour, minute: minute, second: second}, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem("token")
      }
    })
  }


}

