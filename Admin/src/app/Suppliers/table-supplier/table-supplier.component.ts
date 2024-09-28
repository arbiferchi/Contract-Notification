import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService } from 'src/app/supplier-service.service';
import { Supplier } from '../supplier.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-supplier',
  templateUrl: './table-supplier.component.html',
  styleUrls: ['./table-supplier.component.scss']
})
export class TableSupplierComponent implements OnInit {
  suppliers: Supplier[] = [];
  filteredSuppliers: Supplier[] = [];
  isModalVisible = false;
  editForm: FormGroup;
  currentSupplierId: string | null = null;
  selectedSupplier: Supplier | null = null;
  contacts: any[] = []; // New property to hold contacts data
  isStatusModalVisible: boolean = false;

  isContactsModalVisible = false; // New property to control visibility of contacts modal


  constructor(private supplierService: SupplierService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      type: ['', Validators.required],
      address: ['', Validators.required],
      companyDetails: this.fb.group({
        industry: [''],
        registrationNumber: [''],
        website: ['']
      }),
      contactDetails: this.fb.group({
        position: [''],
        department: ['']
      }),
      contacts: [[]],

    });

   
  }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe(
      (response: any) => {
        this.suppliers = response.data; // Extract suppliers from the data property
        this.filteredSuppliers = this.suppliers;
      },
      (error) => {
        console.error('Error loading suppliers:', error);
        this.suppliers = [];
        this.filteredSuppliers = [];
      }
    );
  }

  openEditModal(supplier: Supplier): void {
    this.currentSupplierId = supplier._id ?? null;
    this.editForm.patchValue({
      name: supplier.name,
      email: supplier.email,
      phone: supplier.phone,
      type: supplier.type,
      address: supplier.address,
      companyDetails: supplier.companyDetails || {
        industry: '',
        registrationNumber: '',
        website: ''
      },
      contactDetails: supplier.contactDetails || {
        position: '',
        department: ''
      },
      contacts: supplier.contacts,
    });

    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  updateSupplier(): void {
    if (this.editForm.valid && this.currentSupplierId) {
      const formValue = this.editForm.value as Supplier;
      const supplierData: Supplier = {
        ...formValue,
        id_parent: formValue.id_parent ? formValue.id_parent : undefined,

        contactDetails: formValue.type === 'contact' ? formValue.contactDetails : undefined,
        companyDetails: formValue.type === 'societe' ? formValue.companyDetails : undefined,
      };

      this.supplierService.updateSupplier(this.currentSupplierId, supplierData).subscribe(
        (response: any) => {
          Swal.fire('Updated!', 'The supplier details have been updated.', 'success');
          this.loadSuppliers(); // Reload suppliers after update
          this.closeModal();
        },
        (error) => {
          console.error('Error updating supplier:', error);
          Swal.fire('Error!', 'Failed to update the supplier.', 'error');
        }
      );
    }
  }

  confirmDelete(supplierId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this supplier!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteSupplier(supplierId);
      }
    });
  }

  deleteSupplier(supplierId: string): void {
    this.supplierService.deleteSupplier(supplierId).subscribe(
      () => {
        Swal.fire('Deleted!', 'The supplier has been deleted.', 'success');
        this.loadSuppliers(); // Reload suppliers after deletion
      },
      (error) => {
        console.error('Error deleting supplier:', error);
        Swal.fire('Error!', 'Failed to delete the supplier.', 'error');
      }
    );
  }

  filterSuppliers(event: any): void {
    const filterValue = event.target.value;
    if (Array.isArray(this.suppliers)) {
      if (filterValue === 'all') {
        this.filteredSuppliers = this.suppliers;
      } else {
        this.filteredSuppliers = this.suppliers.filter(supplier => supplier.type === filterValue);
      }
    } else {
      console.error('Invalid suppliers array:', this.suppliers);
      this.filteredSuppliers = [];
    }
  }

 

 


  showContacts(supplier: Supplier): void {
    if (supplier.type === 'societe') {
      this.selectedSupplier = supplier;
      this.contacts = supplier.contacts || []; // Assign contacts of the supplier
      this.isContactsModalVisible = true; // Show the contacts modal
    }
  }

  closeContactsModal(): void {
    this.isContactsModalVisible = false; // Hide the contacts modal
  }

}
