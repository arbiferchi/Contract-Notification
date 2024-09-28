import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/notification.service';
import { CdkStepper } from '@angular/cdk/stepper'; // Import for CDK Stepper
import { ActivatedRoute, Router } from '@angular/router';

@Component({

  selector: 'app-add-notif',
  templateUrl: './add-notif.component.html',
  styleUrls: ['./add-notif.component.scss']
})
export class AddNotifComponent implements OnInit {
  notificationForm: FormGroup;
  userId: string | undefined;
  @ViewChild(CdkStepper) stepper?: CdkStepper; // Reference to the stepper
  contractId!: string;

  constructor(private fb: FormBuilder, private userService: AuthenticationService
    , private notificationservice: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.notificationForm = this.fb.group({
      contractId: [''],
      userId: [''],
      channel: ['', Validators.required],
      title: ['', Validators.required],
      message: ['', Validators.required],
      sendAt: ['', Validators.required], // New field for SendAt in step 1
      priority: ['low', Validators.required], // New field for priority in step 2
      type: ['sms', Validators.required],     // New field for type in step 2
      retries: ['', Validators.required]   // New field for retries in step 2
    });
  }

  ngOnInit(): void {
    this.contractId = this.route.snapshot.paramMap.get('id')!;
    this.notificationForm.patchValue({ contractId: this.contractId });


    this.retrieveUserId();
    this.notificationForm.valueChanges.subscribe((notificationForm) => {
     
        this.notificationForm.patchValue({ channel: notificationForm.type }, { emitEvent: false });
    
    });
    
     // Subscribe to valueChanges and update channel field based on type
     this.notificationForm.valueChanges.subscribe((formValues) => {
      if (formValues.type) {
        this.notificationForm.patchValue({ channel: formValues.type }, { emitEvent: false });
      }
    });
  }

  retrieveUserId(): void {
    this.userId = this.userService.getUser()?._id;
    if (this.userId) {
      this.notificationForm.patchValue({ userId: this.userId });
      this.setNotificationUserId();
    }
  }

  setNotificationUserId(): void {
    // Additional logic to handle the user ID in the notification context, if needed
    console.log('User ID set for notification:', this.userId);
  }

  onSubmit(): void {
    if (this.notificationForm.valid) {
      this.notificationservice.addNotification(this.notificationForm.value).subscribe({
        next: (response) => {
      setTimeout(() => {
        // Move to the success step after form submission
        if (this.stepper) {
          this.stepper.selectedIndex = 2; // Navigate to the success step (index 2)
        }
      }, 1000); // Simulate a delay for demonstration
    }})
    }
  }

  updateReview(): void {
    document.getElementById('notif-review-title')!.textContent = this.notificationForm.get('title')?.value;
    document.getElementById('notif-review-type')!.textContent = this.notificationForm.get('type')?.value;
    document.getElementById('notif-review-message')!.textContent = this.notificationForm.get('message')?.value;
    document.getElementById('notif-review-priority')!.textContent = this.notificationForm.get('priority')?.value;
    document.getElementById('notif-review-retries')!.textContent = this.notificationForm.get('retries')?.value;
    document.getElementById('notif-review-sendat')!.textContent = this.notificationForm.get('sendAt')?.value;
  }
}
