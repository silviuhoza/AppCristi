import { Component, OnInit } from '@angular/core';
import { Contact } from '../../models/Contact';
import { ContactService } from 'src/app/services/contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  contact: Contact;
  
  id: number;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    
   const id = this.route.snapshot.params['id'];
   this.id = id;
    this.contactService.getContact(id).subscribe(
      ( contact ) => {
        console.log( contact );
        this.contact = contact;
      });
  }

  editContact ( id: number ) {
   
    this.router.navigate(['contacts/'+ id + '/edit'])
  }


  deleteContact(id: number){
    this.contactService.deleteContact(id).subscribe(() => {
        if(confirm('Are you sure that you want to delete this contact')){
        this.flashMessage.show( 'Your contact was successfully removed!', { cssClass: 'alert-success', timeout: 4000 } );
          this.router.navigate( [ 'contacts' ] );
  }
 
});
  }
}
