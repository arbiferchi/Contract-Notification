import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from './Suppliers/supplier.model';
@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:1122/api/suppliers';

  // Add Supplier
  addSupplier(supplierData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, supplierData);
  }

  // Add Contact
  addContact(contactData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/contact/add`, contactData);
  }

  // Delete Supplier (soft delete)
  deleteSupplier(supplierId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${supplierId}`,{headers});
  }

  // Delete specific contact
  deleteContact(contactId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/contact/${contactId}`);
  }

  // Edit Supplier
  updateSupplier(supplierId: string, supplierData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${supplierId}`, supplierData);
  }

  // Get all suppliers (excluding soft-deleted)
  getSuppliers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Get supplier by ID
  getSupplierById(supplierId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${supplierId}`);
  }
  getContactById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/contacts/${id}`);
  }

  getSupplier(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.apiUrl}`);
  }
}
