import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit{

  createUserForm: FormGroup;
  userCreatedSuccessfully = false;
  hiddenField: boolean;

  permissionFields = [
    { key: 'can_read', label: 'Can read all users' },
    { key: 'can_create_users', label: 'Can create users' },
    { key: 'can_update', label: 'Can update users' },
    { key: 'can_delete', label: 'Can delete users' },
    { key: 'can_start', label: 'Can start machines' },
    { key: 'can_restart', label: 'Can restart machines' },
    { key: 'can_stop', label: 'Can stop machines' },
    { key: 'can_create_machines', label: 'Can create machines' },
    { key: 'can_destroy', label: 'Can destroy machines' },
    { key: 'can_search', label: 'Can search machines' },
  ];

  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.hiddenField = false;

    this.createUserForm = this.formBuilder.group({
      name: ['', [Validators.required]], lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]], password: ['', Validators.required],
      can_read: [''], can_create_users: [''], can_update: [''], can_delete: [''],
      can_start: [''], can_restart: [''], can_stop: [''],
      can_create_machines: [''], can_destroy: [''], can_search: [''],

    })
  }

  ngOnInit(): void {
  }

  createUser() {
    let name = this.createUserForm.get('name')?.value;
    let lastname = this.createUserForm.get('lastname')?.value;
    let email = this.createUserForm.get('email')?.value;
    let password = this.createUserForm.get('password')?.value;

    let can_read = this.createUserForm.get('can_read')?.touched;
    let can_create_users = this.createUserForm.get('can_create_users')?.touched;
    let can_update = this.createUserForm.get('can_update')?.touched;
    let can_delete = this.createUserForm.get('can_delete')?.touched;
    let can_start = this.createUserForm.get('can_start')?.touched;
    let can_restart = this.createUserForm.get('can_restart')?.touched;
    let can_stop = this.createUserForm.get('can_stop')?.touched;
    let can_create_machines = this.createUserForm.get('can_create_machines')?.touched;
    let can_destroy = this.createUserForm.get('can_destroy')?.touched;
    let can_search = this.createUserForm.get('can_search')?.touched;

    this.userService.createUser(name, lastname, email, password, can_read, can_update, can_create_users, can_delete, can_search, can_start, can_restart, can_stop, can_create_machines, can_destroy).subscribe(() => {
      this.userCreatedSuccessfully = true;
      this.hiddenField = false;
      this.createUserForm.reset();
      this.toastr.success('User created successfully!', 'User Creation Success');
    }, error => {
      console.log(error.error);
      this.hiddenField = true;
      this.toastr.error('Failed to create user. Please check your inputs and try again.', 'User Creation Error');
    })

  }


}
