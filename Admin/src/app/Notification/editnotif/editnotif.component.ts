import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editnotif',
  templateUrl: './editnotif.component.html',
  styleUrls: ['./editnotif.component.scss']
})
export class EditnotifComponent implements OnInit {
  notificationForm: FormGroup;
  notificationId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.notificationForm = this.fb.group({
      type: ['', Validators.required],
      sendAt: ['', Validators.required],
      title: ['', Validators.required],
      message: ['', Validators.required],
      priority: ['', Validators.required],
      retries: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.notificationId = this.route.snapshot.paramMap.get('id')!;
    if (this.notificationId) {
      this.fetchNotification(this.notificationId);
    }
  }

  fetchNotification(notificationId: string): void {
    this.notificationService.getNotifcationById(notificationId).subscribe(
      (response: any) => {
        const notification = response.data;
        const formattedSendAt = this.formatDateTime(notification.sendAt);

        if (notification) {
          this.notificationForm.patchValue({
            type: notification.type || '',
            sendAt: formattedSendAt,
            title: notification.title || '',
            message: notification.message || '',
            priority: notification.priority || '',
            retries: notification.retries || '',
          });

          console.log('Form Values after patching:', this.notificationForm.value);
        }
      },
      (error) => {
        console.error('Error fetching notification:', error);
      }
    );
  }

  formatDateTime(date: string): string {
    if (date) {
      const d = new Date(date);
      // Format date as `YYYY-MM-DDTHH:mm` for `datetime-local` input
      return d.toISOString().slice(0, 16);
    }
    return '';
  }

  onSubmit(): void {
    if (this.notificationForm.valid) {
      const formValue = this.notificationForm.value;

      this.notificationService.updateNotification(this.notificationId, formValue).subscribe(
        (response) => {
          Swal.fire('Updated!', 'The notification details have been updated.', 'success');
          this.router.navigate(['/notificationlist']);  // Adjust to your actual notification list route
        },
        (error) => {
          console.error('Error updating notification:', error);
          Swal.fire('Error!', 'Failed to update the notification.', 'error');
        }
      );
    } else {
      Swal.fire('Error!', 'Please fill in all required fields.', 'error');
    }
  }
}
