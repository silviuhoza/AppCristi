import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  userUrl = 'http://localhost:3000/users';

  constructor(
    private httpClient: HttpClient
  ) { }

  getUsers (): Observable<User[]> {
    return this.httpClient.get<User[]>( this.userUrl );
  }

  

  addUser ( user: User ): Observable<User> {
    return this.httpClient.post<User>( this.userUrl, user, {
      headers: new HttpHeaders( {
        'Content-Type': 'application/json'
      } )
    });

  }
}
