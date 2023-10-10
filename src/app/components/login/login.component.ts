import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  authenticated: boolean;
  hiddenField: boolean;
  loginForm: FormGroup;

  ngOnInit(): void {
  }


  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.email = "";
    this.password = "";
    this.authenticated = false;
    this.hiddenField = false;

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  authenticate() {
    this.userService.loginUser(this.email, this.password).subscribe((responseLogin) => {
      this.hiddenField = false;
      localStorage.setItem("token", responseLogin.jwt.toString());
      this.router.navigate(["/main-page"]);
      this.loginForm.reset();
      this.toastr.success('You are now logged in.', 'Login successful!');

    }, (error => {
      console.log(error.error);
      this.hiddenField = true;
      localStorage.setItem("token", "");
    }))
  }


}
