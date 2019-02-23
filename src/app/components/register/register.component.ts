import { Component, OnInit } from '@angular/core'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  users: User[];
  user: User;
  registerForm: FormGroup;
  emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  formErrors = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'password': ''
  };

  validationMessages = {
    'firstName': {
      'required': 'First name is required.',
      'minlength': 'First name must be greater than 2 characters.'

    },
    'lastName': {
      'required': 'Last name is required.',
      'minlength': 'Last name must be greater than 2 characters.'

    },

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

    this.registerForm = this.fb.group( {
      firstName: [ '', [ Validators.required, Validators.minLength( 2 ) ] ],
      lastName: [ '', [ Validators.required, Validators.minLength( 2 ) ] ],
      email: [ '', [ Validators.required, Validators.pattern( this.emailRegEx ) ] ],
      password: [ '', [ Validators.required, Validators.minLength( 6 ) ] ]
    });

    this.registerForm.valueChanges.subscribe( ( data ) => {
      this.logValidationErrors( this.registerForm );
    } );

    this.userService.getUsers().subscribe( users => {
      console.log( users );
      this.users = users;
    } );

  }


  logValidationErrors ( group: FormGroup = this.registerForm ): void {

    Object.keys( group.controls ).forEach( ( key: string ) => {

      const abstractControl = group.get( key );

      this.formErrors[ key ] = '';

      if ( abstractControl && !abstractControl.valid
        && ( abstractControl.touched || abstractControl.dirty || abstractControl.value !== '' ) ) {

        const messages = this.validationMessages[ key ];

        for ( const errorKey in abstractControl.errors ) {
          if ( errorKey ) {

            this.formErrors[ key ] += messages[ errorKey ] + ' ';
          }
        }
      }
    });
  }

  onSubmit (): void {
    this.mapFormValuesToUser();

    
    if (this.registerForm.invalid) {
      this.flashMessage.show( 'Please fill out the form correctly!', { cssClass: 'alert-danger', timeout: 4000 } );
    } else {
      const user = this.users.filter(user => {
        if (user.email === this.registerForm.value.email) {
              return true;
            } else {
              return false;
            }
        });
          
      if (user[0]) {
        
        this.flashMessage.show( 'This email is already registered!', { cssClass: 'alert-danger', timeout: 4000 } );
      } else {
        
        this.userService.addUser( this.user ).subscribe( user => {
          console.log( user );
          this.flashMessage.show( 'Your are now successfully logged in!', { cssClass: 'alert-success', timeout: 4000 } );
          this.router.navigate( [ 'contacts' ] )
        } );
      }
    }
    
  }

  mapFormValuesToUser (){
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
    this.user.firstName = this.registerForm.value.firstName;
    this.user.lastName = this.registerForm.value.lastName;
    this.user.email = this.registerForm.value.email;
    this.user.password = this.registerForm.value.password;
  }

}
