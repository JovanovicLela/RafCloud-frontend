import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserUpdate} from "../../models/models";
import {UserService} from "../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit{


  updateUserForm: FormGroup;
  userOldValues: UserUpdate;
  isEmailReadOnly = true;

  canReadPropertyBinding: boolean | undefined;
  canCreatePropertyBinding: boolean | undefined;
  canUpdatePropertyBinding: boolean | undefined;
  canDeletePropertyBinding: boolean | undefined;

  canSearchMachinesPropertyBinding: boolean | undefined;
  canStartMachinesPropertyBinding: boolean | undefined;
  canStopMachinesPropertyBinding: boolean | undefined;
  canRestartMachinesPropertyBinding: boolean | undefined;
  canCreateMachinesPropertyBinding: boolean | undefined;
  canDestroyMachinesPropertyBinding: boolean | undefined;



  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder, private toastr: ToastrService) {

    this.userOldValues = {
      userId: -1,
      name: '',
      lastname: '',
      email: '',
      password: '',
      permission: {
        permissionId: -1,
        can_create_users: false,
        can_read_users: false,
        can_update_users: false,
        can_delete_users: false,

        can_create_machines: false,
        can_destroy_machines: false,
        can_start_machines: false,
        can_restart_machines: false,
        can_stop_machines: false,
        can_search_machines: false
      }
    };

    this.canDeletePropertyBinding = false;
    this.canUpdatePropertyBinding = false;
    this.canReadPropertyBinding = false;
    this.canCreatePropertyBinding = false;
    this.canSearchMachinesPropertyBinding = false;
    this.canStartMachinesPropertyBinding = false;
    this.canStopMachinesPropertyBinding = false;
    this.canRestartMachinesPropertyBinding = false;
    this.canCreateMachinesPropertyBinding = false;
    this.canDestroyMachinesPropertyBinding = false;


    this.updateUserForm = this.formBuilder.group({
      name: [''], lastname: [''],
      email: [''], password: [''],
      can_read: [''], can_create_users: [''], can_update: [''], can_delete: [''],
      can_start: [''], can_restart: [''], can_stop: [''],
      can_create_machines: [''], can_destroy: [''], can_search: [''],
    });

  }

  ngOnInit(): void {
    // 'http://example.com/api/users/getUser/johndoe'
    // ['', 'api', 'users', 'getUser', 'johndoe@gmail.com']

    let path = this.router.url.split('/');
    this.userService.getUser(path[path.length-1])
      .subscribe((user) => {
      this.userOldValues = user;
      this.canReadPropertyBinding = user.permission.can_read_users;
      this.canCreatePropertyBinding = user.permission.can_create_users;
      this.canUpdatePropertyBinding = user.permission.can_update_users;
      this.canDeletePropertyBinding = user.permission.can_delete_users;
      this.canSearchMachinesPropertyBinding = user.permission.can_search_machines;
      this.canStartMachinesPropertyBinding = user.permission.can_start_machines;
      this.canStopMachinesPropertyBinding = user.permission.can_stop_machines;
      this.canRestartMachinesPropertyBinding = user.permission.can_restart_machines;
      this.canCreateMachinesPropertyBinding = user.permission.can_create_machines;
      this.canDestroyMachinesPropertyBinding = user.permission.can_destroy_machines;
    }, error => {
        console.log(error.error);
      })
  }


  updateUser() {
    let name = this.updateUserForm.get('name')?.value;
    if (name === null || name.trim() === '') {
      name = this.userOldValues.name;
    }

    let lastname = this.updateUserForm.get('lastname')?.value;
    if (lastname === null || lastname.trim() === '') {
      lastname = this.userOldValues.name;
    }

    let password = this.updateUserForm.get('password')?.value;
    if (password === null || password.trim() === '') {
      password = this.userOldValues.name;
    }


    let email = this.updateUserForm.get('email')?.value;
    let can_read = this.updateUserForm.get('can_read')?.touched;
    let can_create_users = this.updateUserForm.get('can_create_users')?.touched;
    let can_update = this.updateUserForm.get('can_update')?.touched;
    let can_delete = this.updateUserForm.get('can_delete')?.touched;
    let can_search = this.updateUserForm.get('can_search')?.touched;
    let can_start = this.updateUserForm.get('can_start')?.touched;
    let can_restart = this.updateUserForm.get('can_restart')?.touched;
    let can_stop = this.updateUserForm.get('can_stop')?.touched;
    let can_create_machines = this.updateUserForm.get('can_create_machines')?.touched;
    let can_destroy = this.updateUserForm.get('can_destroy')?.touched;

    this.userService.updateUser(this.userOldValues.userId, name, lastname, this.userOldValues.email.toString(), password, this.userOldValues.permission?.permissionId, can_read, can_update, can_create_users, can_delete,
      can_search, can_start, can_restart, can_stop, can_create_machines, can_destroy).subscribe(() =>  {

      this.updateUserForm.reset();
      this.canCreatePropertyBinding = false;
      this.canDeletePropertyBinding = false;
      this.canUpdatePropertyBinding =  false;
      this.canReadPropertyBinding = false;
      this.canSearchMachinesPropertyBinding = false;
      this.canStartMachinesPropertyBinding = false;
      this.canStopMachinesPropertyBinding = false;
      this.canRestartMachinesPropertyBinding = false;
      this.canCreateMachinesPropertyBinding = false;
      this.canDestroyMachinesPropertyBinding = false;

      this.router.navigate(["/all-users"]);
      this.toastr.success("User with email:  " + this.userOldValues.email + " is now updated.", "Updated user.");


    }, error => {
      console.log(error.error);
      console.log("Error:", error);

      if (error.status === 404) {
        this.toastr.error("User not found.");
      } else {
        this.toastr.error("An error occurred. Please try again later.");
      }
    })
  }
}


