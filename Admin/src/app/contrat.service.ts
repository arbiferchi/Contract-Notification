import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contract } from './Contrat/contrat.model';
@Injectable({
  providedIn: 'root'
})
export class ContratService {

  private apiUrl = 'http://localhost:1122/api/contracts'; // Adjust the URL according to your backend

  constructor(private http: HttpClient) {}

  // Add a new contract
  addContract(contractData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, contractData);
  }

  // Update an existing contract
  updateContract(id: string, contract: Contract): Observable<Contract> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Contract>(`${this.apiUrl}/${id}`, contract,{ headers });
  }
  // Delete a contract
  deleteContract(contractId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/${contractId}`, { headers });
  }

  // Get all contracts
  getContracts(): Observable<any> {
    const token = localStorage.getItem('token'); // or get from cookies
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Get a contract by ID
  getContractById(contractId: string): Observable<Contract> {
    return this.http.get<Contract>(`${this.apiUrl}/${contractId}`);
  }
  getContractByid(contractId: string): Observable<{ data: Contract }> {
    return this.http.get<{ data: Contract }>(`${this.apiUrl}/${contractId}`);
  }

  // Search contracts by criteria (optional)
  searchContracts(query: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/search`, { params: query });
  }

  getMonthlyContracts(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/monthly-contracts-trend`, { headers });
  }

  getContractsBySupplier(): Observable<{ msg: string, data: any[] }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ msg: string, data: any[] }>(`${this.apiUrl}/contracts-by-supplier`, { headers });
  }
}
