import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";
import {MainPageComponent} from "./components/main-page/main-page.component";
import {UserReadComponent} from "./components/user-read/user-read.component";
import {UserCreateComponent} from "./components/user-create/user-create.component";
import {MachineCreateComponent} from "./components/machine-create/machine-create.component";
import {MachineSearchComponent} from "./components/machine-search/machine-search.component";
import {MachineDestroyComponent} from "./components/machine-destroy/machine-destroy.component";
import {MachineScheduleComponent} from "./components/machine-schedule/machine-schedule.component";
import {UserUpdateComponent} from "./components/user-update/user-update.component";
import {ErrorMessageComponent} from "./components/error-message/error-message.component";
import {AuthGuard} from "./guards/auth/auth.guard";
import {UserReadGuard} from "./guards/authorization/user-read.guard";
import {UserCreateGuard} from "./guards/authorization/user-create.guard";
import {UserUpdateGuard} from "./guards/authorization/user-update.guard";
import {MachineCreateGuard} from "./guards/authorization/machine-create.guard";
import {MachineSearchGuard} from "./guards/authorization/machine-search.guard";
import {MachineDestroyGuard} from "./guards/authorization/machine-destroy.guard";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "main-page", component: MainPageComponent, canActivate: [AuthGuard]},
  { path: "error-messages", component: ErrorMessageComponent, canActivate: [AuthGuard]},
  { path: "schedule/:id", component: MachineScheduleComponent, canActivate: [AuthGuard] },
  {
    path: "all-users",
    component: UserReadComponent,
    canActivate: [AuthGuard, UserReadGuard]
  },
  {
    path: "create-user",
    component: UserCreateComponent,
    canActivate: [AuthGuard, UserCreateGuard]
  },
  {
    path: "update-user/:email",
    component: UserUpdateComponent,
    canActivate: [AuthGuard, UserUpdateGuard]
  },
  {
    path: "create-machine",
    component: MachineCreateComponent,
    canActivate: [AuthGuard, MachineCreateGuard]
  },
  {
    path: "search-machine",
    component: MachineSearchComponent,
    canActivate: [AuthGuard, MachineSearchGuard]
  },
  {
    path: "destroy-machine",
    component: MachineDestroyComponent,
    canActivate: [AuthGuard, MachineDestroyGuard]
  },

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
