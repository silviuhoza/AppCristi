import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../models/Contact';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseUrl = 'http://localhost:3000/contacts';


  constructor(
    private httpClient: HttpClient
  ) { }

  getContacts (): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>( this.baseUrl );
  }

  getContact ( id: number ): Observable<Contact> {
    return this.httpClient.get<Contact>( `${ this.baseUrl }/${ id }`);
  }

  addContact ( contact: Contact ): Observable<Contact> {
    return this.httpClient.post<Contact>( this.baseUrl, contact, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
     
  }

  updateContact ( contact: Contact ): Observable<void> {
    return this.httpClient.put<void>( `${ this.baseUrl }/${ contact.id }`, contact, {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json'
      } )
    } )
      
  }

  deleteContact ( id: number ): Observable<void> {
    return this.httpClient.delete<void>( `${ this.baseUrl }/${ id }` )
      
  }

}
