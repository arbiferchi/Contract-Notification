import { Component, OnInit } from '@angular/core';
import { SupplierService } from 'src/app/supplier-service.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {
  supplierForm: FormGroup;

  constructor(private fb: FormBuilder, private supplierService: SupplierService) {
    this.supplierForm = this.fb.group({
      name: ['', Validators.required],
      email: [''],
      phone: [''],
      address: [''],
      type: ['', Validators.required],
      companyDetails: this.fb.group({
        industry: [''],
        registrationNumber: [''],
        website: ['']
      }),
      contactDetails: this.fb.group({
        position: [''],
        department: ['']
      }),
      contacts: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.supplierForm.get('type')?.valueChanges.subscribe(value => {
      if (value === 'contact') {
        this.supplierForm.get('companyDetails')?.reset();
        (this.supplierForm.get('contacts') as FormArray).clear();
        this.supplierForm.get('contactDetails')?.setValidators([Validators.required]);
        this.supplierForm.get('contactDetails')?.updateValueAndValidity();
      } else if (value === 'societe') {
        this.supplierForm.get('contactDetails')?.reset();
        this.supplierForm.get('contactDetails')?.clearValidators();
        this.supplierForm.get('contactDetails')?.updateValueAndValidity();
        this.addDefaultContact();
      }
    });

    // Initialize with default state
    this.addDefaultContact();
  }

  get contacts(): FormArray {
    return this.supplierForm.get('contacts') as FormArray;
  }

  addContact(): void {
    this.contacts.push(this.fb.group({
      name: ['', Validators.required],
      email: [''],
      phone: [''],
      address: [''],
      position: [''],
      department: ['']
    }));
  }

  removeContact(index: number): void {
    this.contacts.removeAt(index);
  }

  addDefaultContact(): void {
    if (this.supplierForm.get('type')?.value === 'societe' && this.contacts.length === 0) {
      this.addContact();
    }
  }

  onSubmit(): void {
    if (this.supplierForm.valid) {
      const supplierData = this.supplierForm.value;

      if (supplierData.type === 'contact') {
        supplierData.companyDetails = null;
      } else if (supplierData.type === 'societe') {
        supplierData.contactDetails = null;
        supplierData.contacts.forEach((contact: any) => {
          contact.position = contact.position;
          contact.department = contact.department;
        });
      }

      this.supplierService.addSupplier(supplierData).subscribe(
        response => {
          console.log('Supplier added successfully', response);
        },
        error => {
          console.error('Error adding supplier', error);
        }
      );
    }
  }
}
