  import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
  import { SupplierService } from 'src/app/supplier-service.service';
  import { ContratService } from 'src/app/contrat.service';
  import { Supplier } from 'src/app/Suppliers/supplier.model';
  import { AuthenticationService } from 'src/app/core/services/auth.service';

  @Component({
    selector: 'app-add-contract',
    templateUrl: './add-contrat.component.html',
    styleUrls: ['./add-contrat.component.scss']
  })
  export class AddContratComponent implements OnInit {
    contractForm: FormGroup;
    suppliers: Supplier[] = [];
    userId?: string;

    constructor(
      private fb: FormBuilder,
      private supplierService: SupplierService,
      private contractService: ContratService,
      private userService: AuthenticationService
    ) {
      this.contractForm = this.fb.group({
        userId: [''],
        supplierId: ['', Validators.required],
        title: ['', Validators.required],
        description: ['', Validators.required],
        shortDescription: [''],
        tag: [''],
        montant: [0, Validators.required],
        startDate: ['', Validators.required],
        dueDate: ['', Validators.required],
        status: ['en cours', Validators.required],
        notifications: this.fb.array([]) // Initialize empty FormArray
      });
    }

    ngOnInit() {
      // Get the current user's ID
      this.userId = this.userService.getUser()?._id;
      if (this.userId) {
        this.contractForm.patchValue({ userId: this.userId });
        this.setNotificationUserId();
      }

      // Fetch suppliers
      this.supplierService.getSuppliers().subscribe({
        next: (response: any) => {
          if (Array.isArray(response.data)) {
            this.suppliers = response.data; 
          } else {
            console.error('Suppliers data is not an array:', response);
          }
        },
        error: (err) => {
          console.error('Error fetching suppliers:', err);
        }
      });

          // Listen to changes in the type field of notifications and set channel value
          this.notifications.valueChanges.subscribe((notifications) => {
            notifications.forEach((notification: any, index: number) => {
              this.notifications.at(index).patchValue({ channel: notification.type }, { emitEvent: false });
            });
          });
    }

    get notifications() {
      return this.contractForm.get('notifications') as FormArray;
    }

    addNotification() {
      const notificationGroup = this.fb.group({
        userId: [this.userId, [Validators.required, Validators.pattern(/^[0-9a-fA-F]{24}$/)]], // Validate as ObjectId
        title: [''],
        message: [''],
        sendAt: [''],
        priority: ['low'],
        type: ['email'],
        retries: [0],
        channel: ['']  // Hidden field for channel

      });
      this.notifications.push(notificationGroup);
    }

    removeNotification(index: number) {
      this.notifications.removeAt(index);
    }

    setNotificationUserId() {
      // Set userId for each notification in the form if userId is available
      this.notifications.controls.forEach(control => {
        control.patchValue({ userId: this.userId });
      });
    }

    onSubmit() {
      console.log('Submitting contract:', this.contractForm.value); // Debugging line

      this.contractService.addContract(this.contractForm.value).subscribe({
        next: (response) => {
          console.log('Contract added successfully', response);
        },
        error: (error) => {
          console.error('Error adding contract', error);
        }
      });
    }
  }
