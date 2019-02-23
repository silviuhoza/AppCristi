import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: User[];
  user: User;
  loginForm: FormGroup;
  emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  formErrors = {
    'firstName': '',
    'email': '',
    'password': '',

  };

  validationMessages = {
    
    'email': {
      'required': 'Email is required.',
      'pattern': 'Email is not valid.'
    },

    'password': {
      'required': 'Pasword is required.',
      'minlength': 'Password number must have at least 6 characters'
    }
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {

    this.loginForm = this.fb.group( {
      
      email: [ '', [ Validators.required, Validators.pattern( this.emailRegEx ) ] ],
      password: [ '', [ Validators.required, Validators.minLength(6) ] ]
    });


    this.loginForm.valueChanges.subscribe( ( data ) => {
      this.logValidationErrors( this.loginForm );
    } );

    this.userService.getUsers().subscribe(users => {
      console.log(users);
      this.users = users;
    });
  }


  logValidationErrors ( group: FormGroup = this.loginForm ): void {

    Object.keys( group.controls ).forEach( ( key: string ) => {

      const abstractControl = group.get( key );

      this.formErrors[ key ] = '';

      if ( abstractControl && !abstractControl.valid
        && ( abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {

        const messages = this.validationMessages[ key ];

        for ( const errorKey in abstractControl.errors ) {
          if ( errorKey ) {

            this.formErrors[ key ] += messages[ errorKey ] + ' ';
          }
        }
      }
    });
  }


  onSubmit(): void {

    if ( this.loginForm.get( 'email' ).invalid || this.loginForm.get( 'password' ).invalid) {
      this.flashMessage.show( 'Please fill out the form correctly!', { cssClass: 'alert-danger', timeout: 4000 } );
    } else  {
     
         const user = this.users.filter( ( user ) => {
          if ( user.email === this.loginForm.value.email && user.password === this.loginForm.value.password ) {
            return true;
          } 
         });  
      console.log(user[0]);

      this.user = user[0];
        if (this.user) {
         this.flashMessage.show( 'You are now logged in!', { cssClass: 'alert-success', timeout: 4000 } );
            this.router.navigate( [ 'contacts' ] );
        } else {
          this.flashMessage.show( 'Your email, or password is wrong, or you are not registered!', { cssClass: 'alert-danger', timeout: 4000 } );
        }
      };
      
    }
    
  }