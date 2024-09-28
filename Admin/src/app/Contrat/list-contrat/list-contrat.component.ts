import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ContratService } from 'src/app/contrat.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { cloneDeep } from 'lodash';
import { Supplier } from 'src/app/Suppliers/supplier.model';
import { Contact } from '../contact.model';
import { SupplierService } from 'src/app/supplier-service.service';
@Component({
  selector: 'app-list',
  templateUrl: './list-contrat.component.html',
  styleUrls: ['./list-contrat.component.scss'],
})
export class ListContratComponent implements OnInit {
  breadCrumbItems: Array<{ label: string, active: boolean }> = [];
  ContractList: any[] = [];
  contracts: any[] = [];
  filteredContracts: any[] = [];
  searchTerm: string = '';
  deleteId?: any;
  masterSelected: boolean = false;
  checkedValGet: any[] = [];
  direction: 'asc' | 'desc' = 'asc';
  selectedSupplier: Supplier | null = null;
  selectedContacts: Contact[] = [];


  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;
  @ViewChild('supplierModal', { static: false }) supplierModal?: ModalDirective;

  constructor(public router: Router, private contractService: ContratService,private supplierService : SupplierService) {}
  viewSupplierDetails(supplier: Supplier): void {
    if (!supplier || !supplier._id) {
      console.error('Invalid supplier:', supplier);
      return;
    }

    this.selectedSupplier = supplier;

    if (this.isSociete(supplier) && supplier.contacts && Array.isArray(supplier.contacts)) {
      this.selectedContacts = [];
      // Fetch contact details by ID         
      supplier.contacts.forEach(contactId => {
        if (typeof contactId === 'string') {
          this.supplierService.getContactById(contactId).subscribe(
            response => {
              if (response.data) {
                this.selectedContacts.push(response.data);
              }
            },
            error => {
              console.error('Error fetching contact:', error);
            }
          );
        } else {
          console.error('Contact ID should be a string:', contactId);
        }
      });
    } else {
      this.selectedContacts = []; // No contacts available
    }

    this.supplierModal?.show();
  }

  isSociete(supplier: Supplier): boolean {
    return supplier.type === 'societe';
  }

  isContact(supplier: Supplier): boolean {
    return supplier.type === 'contact';
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Contract', active: true },
      { label: 'Contract List', active: true },
    ];
  
    this.contractService.getContracts().subscribe(
      response => {
        console.log('Fetched data:', response); // Debugging line
        this.ContractList = Array.isArray(response.data) ? response.data : [];
        this.contracts = cloneDeep(this.ContractList.slice(0, 10));
        this.filteredContracts = cloneDeep(this.ContractList.slice(0, 10));
        document.getElementById('elmLoader')?.classList.add('d-none');
      },
      error => {
        console.error('Error fetching contracts:', error); // Debugging line
      }
    );
  }
  

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.contracts = this.filteredContracts.slice(startItem, endItem);
  }

  performSearch(): void {
    if (this.searchTerm) {
      this.filteredContracts = this.ContractList.filter(contract => {
        const term = this.searchTerm.toLowerCase();
        return (
          (contract.title?.toLowerCase().includes(term) ?? false) ||
          (contract.description?.toLowerCase().includes(term) ?? false)
        );
      });
    } else {
      this.filteredContracts = this.ContractList;
    }
    this.pageChanged({ page: 1, itemsPerPage: 10 }); // Reset to first page after search
  }

  onSort(column: string): void {
    this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    const sortedArray = [...this.filteredContracts];
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.filteredContracts = sortedArray;
    this.pageChanged({ page: 1, itemsPerPage: 10 }); // Reset to first page after sorting
  }

  compare(v1: string | number, v2: string | number): number {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  ViewContract(contractId: string): void {
    this.router.navigate(['/contracts/create', contractId]);
  }


  EditContract(contractId: string): void {
    this.router.navigate(['/contracts/create', contractId]);
  }

  confirmDelete(): void {
    if (this.deleteId) {
      this.contractService.deleteContract(this.deleteId).subscribe(() => {
        this.filteredContracts = this.filteredContracts.filter(contract => contract._id !== this.deleteId);
        this.ContractList = this.ContractList.filter(contract => contract._id !== this.deleteId);
        this.pageChanged({ page: 1, itemsPerPage: 10 }); // Reset to first page after deletion
        this.deleteRecordModal?.hide();
      });
    }
  }

  checkUncheckAll(ev: any): void {
    this.masterSelected = ev.target.checked;
    this.filteredContracts.forEach(data => data.isSelected = this.masterSelected);
    this.updateCheckedValues();
  }

  onCheckboxChange(): void {
    this.updateCheckedValues();
  }

  private updateCheckedValues(): void {
    this.checkedValGet = this.filteredContracts
      .filter(contract => contract.isSelected)
      .map(contract => contract._id);
    document.getElementById('remove-actions')?.classList.toggle('d-none', this.checkedValGet.length === 0);
  }

  removeData(id: any): void {
    this.deleteId = id;
    this.deleteRecordModal?.show();
  }

  deleteData(event: any): void {
    this.contractService.deleteContract(this.checkedValGet.toString()).subscribe(() => {
      this.filteredContracts = this.filteredContracts.filter(contract => !this.checkedValGet.includes(contract._id));
      this.ContractList = this.ContractList.filter(contract => !this.checkedValGet.includes(contract._id));
      this.pageChanged({ page: 1, itemsPerPage: 10 }); // Reset to first page after bulk deletion
      this.checkedValGet = [];
      this.masterSelected = false;
      event.target.closest('tr')?.remove();
    });
  }

  onSelectContract(contractId: string): void {
    // Implement this method to handle contract selection
    console.log('Selected contract ID:', contractId);
  }
}
