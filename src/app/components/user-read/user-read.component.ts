import {Component, OnInit} from '@angular/core';
import {UserUpdate} from "../../models/models";
import {UserService} from "../../services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-read',
  templateUrl: './user-read.component.html',
  styleUrls: ['./user-read.component.css']
})
export class UserReadComponent implements OnInit{

  users: UserUpdate[];
  canCreateUser: boolean;
  canUpdateUser: boolean;
  canDeleteUser: boolean;
  currentPage: number = 1;
  itemsPerPage = 3;


  constructor(private userService: UserService, private toastr: ToastrService) {
    this.users = [];
    // @ts-ignore
    let decodedJWT = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    this.canCreateUser = decodedJWT.permission.can_create_users;
    this.canUpdateUser = decodedJWT.permission.can_update_users;
    this.canDeleteUser = decodedJWT.permission.can_delete_users;
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    })
  }

  deleteUser(email: String) {

    const confirmed = window.confirm("Do you really want to delete this user?");

    // @ts-ignore
    let decodedJWT = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    if (decodedJWT.permission.can_delete_users) {
      if (confirmed) {
        this.userService.deleteUser(email).subscribe(() => {
          this.userService.getUsers().subscribe((users) => {
            this.users = users;
            this.toastr.success('User deleted successfully', 'User Deleted');
          })
        }, error => {
          console.log(error.error);
          this.toastr.error('Failed to delete user. Please try again later.', 'Deletion Error');
        })
      } else {
        this.toastr.info('This user was not deleted.', 'Deletion canceled');
      }

    }
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    console.log(`Page changed to: ${pageNumber}`);
  }


}
