import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../store/models/auth.models';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserProfileService {
    private apiUrl = 'http://localhost:1122/api/users';

    constructor(private http: HttpClient,private router: Router) {}

    
    getAll() {
        return this.http.get<User[]>(`api/users`);
    }

    /***
     * Facked User Register
     */
    register(userData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, userData);
      }
  
}
