import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{

  canReadUsers: boolean;
  canCreateMachine: boolean;
  canSearchMachine: boolean;
  canDestroyMachine: boolean;

  constructor() {
    // @ts-ignore
    let decodedJWT = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    this.canReadUsers = decodedJWT.permission.can_read_users;
    this.canCreateMachine = decodedJWT.permission.can_create_machines;
    this.canSearchMachine = decodedJWT.permission.can_search_machines;
    this.canDestroyMachine = decodedJWT.permission.can_destroy_machines;
  }

  ngOnInit(): void {
  }

}
