import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { User } from '../../store/models/auth.models';
import { getFirebaseBackend } from 'src/app/authUtils';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { GlobalComponent } from "../../global-component";
import * as bcrypt from 'bcryptjs'; // Import bcryp
import { ListJsModel } from 'src/app/pages/tables/listjs/listjs.model';
// Action
import { login, loginSuccess, loginFailure, logout, logoutSuccess, RegisterSuccess } from '../../store/actions/authentication.actions';

// Firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';



const AUTH_API = GlobalComponent.AUTH_API;



@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private apiUrl = 'http://localhost:1122/api/users';

    constructor(private http: HttpClient,private router: Router) {}


    getLoggedInUser(): any {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    }
    
    signUp(formData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/register`, formData);
    }

    login(credentials: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/login`, credentials);
    }

    setSession(authResult: any): void {
        localStorage.setItem('currentUser', JSON.stringify(authResult.user));
        localStorage.setItem('token', authResult.token);
    }

    logout(): void {
      console.log('Logging out...');
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      localStorage.removeItem('user');

    }

    isLoggedIn(): boolean {
      return !!localStorage.getItem('token');
    }

    getUser(): any {
      return JSON.parse(localStorage.getItem('currentUser') || '{}');
    }
    updateUser(id: string, userData: any): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.put(`${this.apiUrl}/${id}`, userData, { headers });
    }
    
    getAllUsers(): Observable<any> {
      return this.http.get<any>(this.apiUrl);
    }
    
    deleteUser(id: string): Observable<any> {
      const token = localStorage.getItem('token');
      const httpOptions = {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`
        })
      };
  
      return this.http.delete(`${this.apiUrl}/${id}`, httpOptions);
  }
  
  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }


  getAllUser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  public currentUser(): any {
    return getFirebaseBackend()!.getAuthenticatedUser();
}

comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashedPassword, (err, isMatch) => {
            if (err) {
                reject(err);
            } else {
                resolve(isMatch);
            }
        });
    });
}

updateUserStatus(id: string, status: 'active' | 'blocked'): Observable<any> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.put(`${this.apiUrl}/status/${id}`, { status }, { headers });
}
  }
