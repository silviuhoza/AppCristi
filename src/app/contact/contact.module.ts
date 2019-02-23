import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { ContactRoutingModule } from './contact-routing.module';



import { ContactsComponent } from './contacts/contacts.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';

@NgModule({
  declarations: [
    ContactsComponent,
    ContactAddComponent,
    ContactDetailsComponent
  ],
  imports: [
    ContactRoutingModule,
    SharedModule
  ],
  exports: [
    ContactsComponent
  ]
})
export class ContactModule { }
