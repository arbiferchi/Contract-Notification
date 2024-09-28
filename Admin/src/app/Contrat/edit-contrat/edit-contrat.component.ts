import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContratService } from 'src/app/contrat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-contrat',
  templateUrl: './edit-contrat.component.html',
  styleUrls: ['./edit-contrat.component.scss']
})
export class EditContratComponent implements OnInit {
  contractForm: FormGroup;
  contractId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private contractService: ContratService
  ) {
    this.contractForm = this.fb.group({
      title: ['', Validators.required],
      supplierId: [''], // Assuming this is a dropdown or another component
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['', Validators.required],
      tag: [''],
      shortDescription: ['']
    });
  }

  ngOnInit(): void {
    this.contractId = this.route.snapshot.paramMap.get('id')!;
    if (this.contractId) {
      this.fetchContract(this.contractId);
    }
  }

  fetchContract(contractId: string): void {
    this.contractService.getContractById(contractId).subscribe(
      (response: any) => {
        const contract = response.data;

        if (contract) {
          this.contractForm.patchValue({
            title: contract.title || '',
            supplierId: contract.supplierId?._id || '', // Adjust if necessary
            description: contract.description || '',
            startDate: this.formatDate(contract.startDate),
            dueDate: this.formatDate(contract.dueDate),
            status: contract.status || '',
            tag: contract.tag || '',
            shortDescription: contract.shortDescription || ''
          });

          console.log('Form Values after patching:', this.contractForm.value);
        }
      },
      (error) => {
        console.error('Error fetching contract:', error);
      }
    );
  }

  formatDate(date: any): string {
    if (date) {
      const d = new Date(date);
      return d.toISOString().split('T')[0]; // Converts to YYYY-MM-DD
    }
    return '';
  }

  onSubmit(): void {
    if (this.contractForm.valid) {
      const formValue = this.contractForm.value;

      this.contractService.updateContract(this.contractId, formValue).subscribe(
        (response) => {
          Swal.fire('Updated!', 'The contract details have been updated.', 'success');
          this.router.navigate(['/contratlist']);
        },
        (error) => {
          console.error('Error updating contract:', error);
          Swal.fire('Error!', 'Failed to update the contract.', 'error');
        }
      );
    } else {
      Swal.fire('Error!', 'Please fill in all required fields.', 'error');
    }
  }
}
