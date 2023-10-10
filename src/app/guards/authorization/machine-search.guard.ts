import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MachineSearchGuard implements CanActivate {

  constructor(private toastr: ToastrService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // @ts-ignore
    let decodedJWT = JSON.parse(window.atob(localStorage.getItem("token").split('.')[1]));


    if (!decodedJWT.permission.can_search_machines)
      this.toastr.warning("You don't have permission to search/schedule machines.", "Access denied!");

    return decodedJWT.permission.can_search_machines;
  }
}
