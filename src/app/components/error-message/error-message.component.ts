import {Component, OnInit} from '@angular/core';
import {ErrorMessage} from "../../models/models";
import {UserService} from "../../services/user.service";
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit{

  errorMessages: ErrorMessage[];
  currentPage: number = 1; // Current page
  itemsPerPage = 15;

  constructor(private userService: UserService) {
    this.errorMessages = [];
  }

  ngOnInit(): void {
    this.userService.getErrorMessages().subscribe((errorMessages) => {
      this.errorMessages = errorMessages;
    });
  }



  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    console.log(`Page changed to: ${pageNumber}`);
  }

}
