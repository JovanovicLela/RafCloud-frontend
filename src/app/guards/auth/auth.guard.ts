import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private router: Router, private toastr: ToastrService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let token = localStorage.getItem("token");

    if (token === null || token === "") {
      this.toastr.warning("You must be first logged in.", 'Access Denied');
      return false;
    }

    // @ts-ignore
    let decodedJWT = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));

    if ((Math.floor((new Date).getTime() / 1000)) >= decodedJWT.exp) {
      this.toastr.warning("Token expired!");
      localStorage.setItem('token', '');
      this.router.navigate(["/"]);
      return false;
    }

    return true;

  }

}
