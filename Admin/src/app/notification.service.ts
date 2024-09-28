import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from './Notification/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:1122/api/notif';

  constructor(private http: HttpClient) {}

  // Create a new notification
  createNotification(notificationData: Notification): Observable<Notification> {
    return this.http.post<Notification>(`${this.apiUrl}`, notificationData);
  }

  // Update an existing notification
  updateNotification(id: string, notification:Notification ): Observable<Notification> {
    return this.http.put<Notification>(`${this.apiUrl}/${id}`, notification);
  }

  // Delete a notification
  deleteNotification(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

  // Associate a notification with a contract
  associateContract(id: string, contractId: string): Observable<Notification> {
    return this.http.patch<Notification>(`${this.apiUrl}/${id}/contract`, { contractId });
  }

  getNotifications(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}`, { headers });
  }

  addNotification(notification: Notification): Observable<Notification> {
    return this.http.post<Notification>(`${this.apiUrl}`, notification);
  }

   // Get a contract by ID
   getNotifcationById(NpotificationId: string): Observable<Notification> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Notification>(`${this.apiUrl}/find/${NpotificationId}`, { headers });
  }
  getNotificationStats(interval: 'day' | 'week' | 'month'): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`, {
      params: { interval }
    });
  }
}
