import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { Contact } from 'src/app/models/Contact';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent implements OnInit {

  contactForm: FormGroup;
  contact: Contact;
  emailRegEx = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  editId: number;
  stateTitle: string;
  stateUrl: string;
  titleButton: string;
  submitButton: string;
  

  formErrors = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'phone': '',
    
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
    
    'phone': {
      'required': 'Phone is required.',
      'minlength': 'Phone number must have at least 10 characters'
    }
  };
 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
    private flashMessage: FlashMessagesService

  ) { }

  ngOnInit() {
    
 this.contactForm = this.fb.group({
   firstName: ['', [Validators.required, Validators.minLength(2)]],
   lastName: ['', [Validators.required, Validators.minLength(2)]],
   email: [ '', [ Validators.required, Validators.pattern( this.emailRegEx)]],
   phone: ['',[Validators.required, Validators.minLength(10)]]
     });

    this.contactForm.valueChanges.subscribe( ( data ) => {

      this.logValidationErrors( this.contactForm );
      });
    
    this.route.paramMap.subscribe((params) => {
      const contactId = +params.get('id');
      console.log(contactId);
      this.editId = contactId;
      if (contactId) {
        this.stateTitle = 'Edit Contact';
        this.stateUrl = `/contacts/${this.editId}`;
        this.titleButton = 'Back to your details panel';
        this.submitButton = 'Update Contact';
        this.getContact(contactId);
      } else {
        this.stateTitle = 'Create Contact';
        this.stateUrl = '/contacts';
        this.titleButton = 'Back to Dashboard';
        this.submitButton = 'Add Contact';
        this.contact = {
          id: null,
          firstName: '',
          lastName: '',
          email: '',
          phone: null
        }
      }
      
    });
  }

  getContact(id: number){
    this.contactService.getContact(this .editId).subscribe((contact: Contact) => {
        this.editContact(contact);
    });
  }

  editContact(contact: Contact){
    this.contactForm.patchValue({
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone
    });
  }

  logValidationErrors(group: FormGroup = this.contactForm): void {

    Object.keys(group.controls).forEach((key: string) => {
      
      const abstractControl = group.get(key);
         
        this.formErrors[key] = '';

      if ( abstractControl && !abstractControl.valid
        && ( abstractControl.touched || abstractControl.dirty || abstractControl.value !== '' ) ) {
        
          const messages = this.validationMessages[key];
         
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
             
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
    });
  }


 

  onSubmit():void {
     
      this.mapFormValuesToContactModel();
    
    if (this.contact.id) {
      this.contactService.updateContact( this.contact ).subscribe( (updateContact) => {
        // console.log(updateContact);
        this.flashMessage.show( 'Your contact was successfully updated!', { cssClass: 'alert-success', timeout: 4000 } );
        this.router.navigate([ 'contacts/' + this.contact.id ])
      } );
      } else {
       this.contactService.addContact(this.contact).subscribe(contact => {
            console.log(contact);
         this.flashMessage.show( 'Your contact was successfully added to the list!', { cssClass: 'alert-success', timeout: 4000 } );
            this.router.navigate(['contacts'])
            });
          }
    }

  mapFormValuesToContactModel () {
    this.contact = {
      firstName: '',
      lastName: '',
      email: '',
      phone: null,
      id: this.editId
    }
    this.contact.firstName = this.contactForm.value.firstName;
    this.contact.lastName = this.contactForm.value.lastName;
    this.contact.email = this.contactForm.value.email;
    this.contact.phone = this.contactForm.value.phone;
   
    

  }


 
}
