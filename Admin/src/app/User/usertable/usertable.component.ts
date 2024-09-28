import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-table',
  templateUrl: './usertable.component.html',
  styleUrls: ['./usertable.component.scss']
})
export class UserTableComponent implements OnInit {
  users: any[] = [];
  isModalVisible = false;
  editForm: FormGroup;
  currentUserId: string | null = null;
  selectedUser: any;
  statusForm: FormGroup;
  isStatusModalVisible: boolean = false;

  constructor(private authService: AuthenticationService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      tel: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.statusForm = this.fb.group({
      status: ['', Validators.required]
    });
  }
  toggleStatus(user: any): void {
    // Toggle between 'active' and 'blocked'
    user.status = user.status === 'active' ? 'blocked' : 'active';
  
    // Call the service to update the status in the backend
    this.authService.updateUserStatus(user._id, user.status).subscribe(
      (response) => {
        console.log('Status updated successfully');
      },
      (error) => {
        console.error('Error updating status', error);
        // Revert status if error occurs
        user.status = user.status === 'active' ? 'blocked' : 'active';
      }
    );
  }
  
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getAllUsers().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.data)) {
          this.users = response.data;
        } else {
          console.error('Unexpected response format:', response);
        }
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  openEditModal(user: any): void {
    this.currentUserId = user._id;
    this.editForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      tel: user.tel,
      status: user.status
    });
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  updateUser(): void {
    if (this.editForm.valid && this.currentUserId) {
      this.authService.updateUser(this.currentUserId, this.editForm.value).subscribe(
        (response: any) => {
          Swal.fire('Updated!', 'The user details have been updated.', 'success');
          this.loadUsers(); // Reload users after update
          this.closeModal();
        },
        (error) => {
          console.error('Error updating user:', error);
          Swal.fire('Error!', 'Failed to update the user.', 'error');
        }
      );
    }
  }

  openStatusModal(user: any): void {
    this.selectedUser = user;
    this.statusForm.patchValue({ status: user.status });
    this.isStatusModalVisible = true;
  }

  closeStatusModal(): void {
    this.isStatusModalVisible = false;
    this.selectedUser = null;
  }

  updateUserStatus(): void {
    if (this.statusForm.valid && this.selectedUser) {
      const status = this.statusForm.value.status;
      this.authService.updateUserStatus(this.selectedUser._id, status).subscribe(
        (response: any) => {
          Swal.fire('Updated!', 'The user status has been updated.', 'success');
          this.loadUsers(); // Reload users after update
          this.closeStatusModal();
        },
        (error) => {
          console.error('Error updating user status:', error);
          Swal.fire('Error!', 'Failed to update the user status.', 'error');
        }
      );
    }
  }

  confirmDelete(userId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUser(userId);
      }
    });
  } 

  deleteUser(userId: string): void {
    this.authService.deleteUser(userId).subscribe(
      () => {
        Swal.fire('Deleted!', 'The user has been deleted.', 'success');
        this.loadUsers(); // Reload users after deletion
      },
      (error) => {
        console.error('Error deleting user:', error);
        Swal.fire('Error!', 'Failed to delete the user.', 'error');
      }
    );
  }
}
