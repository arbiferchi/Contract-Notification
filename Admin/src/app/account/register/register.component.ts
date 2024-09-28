import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Store } from '@ngrx/store';
import { Register } from 'src/app/store/actions/authentication.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  signupForm!: UntypedFormGroup;
  submitted = false;
  successmsg = false;
  error = '';
  year: number = new Date().getFullYear();

  constructor(private formBuilder: UntypedFormBuilder, private router: Router,
              private authenticationService: AuthenticationService,
              private store: Store) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
      tel: [''],
      photo: ['']
    });
  }

  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('firstName', this.f['firstName'].value);
    formData.append('lastName', this.f['lastName'].value);
    formData.append('email', this.f['email'].value);
    formData.append('password', this.f['password'].value);
    formData.append('role', this.f['role'].value);
    formData.append('tel', this.f['tel'].value);
    formData.append('photo', this.f['photo'].value);

    console.log('Form Data:', formData);

    // Dispatch the signup action
    this.store.dispatch(Register({ 
      firstName: this.f['firstName'].value,
      lastName: this.f['lastName'].value,
      email: this.f['email'].value,
      password: this.f['password'].value,
      role: this.f['role'].value,
      tel: this.f['tel'].value,
      photo: this.f['photo'].value
    }));

    // Call the signUp method
    this.authenticationService.signUp(formData).subscribe(
      response => {
        this.authenticationService.setSession(response);
        this.router.navigate(['']);
        console.log('Sign Up Successful', response);
      },
      error => {
        console.error('Sign Up Error', error);
        this.error = (error?.error?.message) || 'An error occurred during sign-up.';
      }
    );
  }

  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.signupForm.patchValue({ photo: file });
    this.signupForm.get('photo')!.updateValueAndValidity();
  }
}
