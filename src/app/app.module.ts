import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from './shared/shared.module';



import { AppRoutingModule } from './app-routing.module';
import { ContactModule } from './contact/contact.module';


import { ContactService } from './services/contact.service';
import { UserService } from './services/user.service';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    NavbarComponent,
    
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ContactModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
    SharedModule
   
  ],
  providers: [ContactService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
