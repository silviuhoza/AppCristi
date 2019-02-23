import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ContactsComponent } from './contacts/contacts.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';


const routes: Routes = [
  
  { path: 'contacts', component: ContactsComponent },
  { path: 'contacts/add', component: ContactAddComponent },
  { path: 'contacts/:id', component: ContactDetailsComponent },
  { path: 'contacts/:id/edit', component: ContactAddComponent },
  
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class ContactRoutingModule { }