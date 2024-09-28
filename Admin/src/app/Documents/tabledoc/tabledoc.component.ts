import { Component, OnInit } from '@angular/core';
import { DocService } from 'src/app/doc.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'tabledoc-list',
  templateUrl: './tabledoc.component.html',
  styleUrls: ['./tabledoc.component.scss']
})
export class TabledocComponent implements OnInit {
  documents: any[] = [];
  allDocuments: any[] = [];
  contractId!: string;
  direction: string = 'asc';
  endIndex: number = 6; // Number of items per page

  constructor(
    private docService: DocService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    this.contractId = this.route.snapshot.paramMap.get('id')!;
    if (this.contractId) {
      console.log('Contract ID:', this.contractId); // Log the contract ID
      this.getDocumentsByContractId(this.contractId);
    } else {
      console.error('No contract ID found in route');
    }
  }

  getDocumentsByContractId(contractId: string): void {
    this.docService.getDocumentsByContractId(contractId).subscribe({
      next: (response) => {
        this.allDocuments = response.data; // Assuming response structure
        this.documents = this.allDocuments.slice(0, this.endIndex); // Initial pagination setup
      },
      error: (error) => {
        console.error('Error fetching documents:', error);
      }
    });
  }

  // Handle sorting
  onSort(column: string): void {
    this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    const sortedArray = [...this.documents]; // Create a new array for immutability
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.documents = sortedArray;
  }

  // Comparison helper function for sorting
  compare(v1: string | number, v2: string | number): number {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

 

  onDownload(documentId: string): void {
    this.docService.downloadDocument(documentId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = documentId; // You can set a more meaningful name here if needed
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error downloading document:', error);
    });
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
  
    if (!file || !this.contractId) return;
  
    this.docService.uploadDocument(file, this.contractId).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          console.log(`Upload progress: ${Math.round((100 * event.loaded) / event.total!)}%`);
        } else if (event.type === HttpEventType.Response) {
          console.log('Upload complete:', event.body);
          this.getDocumentsByContractId(this.contractId); // Refresh the document list
        }
      },
      error: (error) => {
        console.error('Error uploading document:', error);
      }
    });
  }
  

  }
  
  
  
