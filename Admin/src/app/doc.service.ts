  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
  import { map } from 'rxjs/operators';

  @Injectable({
    providedIn: 'root'
  })
  export class DocService {

    private apiUrl = 'http://localhost:1122/api/docs';

    constructor(private http: HttpClient ,private sanitizer: DomSanitizer) { }

    // Upload a document
    uploadDocument(file: File, contractId: string): Observable<HttpEvent<any>> {
      const formData: FormData = new FormData();
      formData.append('file', file);
      formData.append('contractId', contractId);

      return this.http.post<HttpEvent<any>>(`${this.apiUrl}/documents/upload`, formData, {
        reportProgress: true,
        observe: 'events'
      });
    }

    // Download a document by ID
    downloadDocument(documentId: string): Observable<Blob> {
      return this.http.get(`${this.apiUrl}/documents/telecharger/${documentId}`, {
        responseType: 'blob'
      });
    }

    // Get all documents for the current user
    getDocuments(): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get(`${this.apiUrl}`,{headers});
    }

    // Get documents by contract ID
    getDocumentsByContractId(contractId: string): Observable<any> {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get(`${this.apiUrl}/contract/${contractId}`,{headers});
    }

  }