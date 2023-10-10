import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MachineCreateComponent } from './components/machine-create/machine-create.component';
import { MachineDestroyComponent } from './components/machine-destroy/machine-destroy.component';
import { MachineSearchComponent } from './components/machine-search/machine-search.component';
import { MachineScheduleComponent } from './components/machine-schedule/machine-schedule.component';
import { UserReadComponent } from './components/user-read/user-read.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    MachineCreateComponent,
    MachineDestroyComponent,
    MachineSearchComponent,
    MachineScheduleComponent,
    UserReadComponent,
    UserCreateComponent,
    UserUpdateComponent,
    ErrorMessageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    FormsModule,

  ],
  providers: [provideAnimations(), provideToastr()],
  bootstrap: [AppComponent]
})
export class AppModule { }
