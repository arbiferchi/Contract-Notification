import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Store } from '@ngrx/store';
import { Register } from 'src/app/store/actions/authentication.actions';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

 
  
    signupForm!: UntypedFormGroup;
    submitted = false;
    successmsg = false;
    error = '';
    year: number = new Date().getFullYear();
    selectedFile: File | null = null;

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
  
    onSubmit(form: any) {
      if (form.valid) {
        const formData = new FormData();
        formData.append('firstName', form.value.firstName);
        formData.append('lastName', form.value.lastName);
        formData.append('email', form.value.email);
        formData.append('password', form.value.password);
        formData.append('role', form.value.role);
        formData.append('tel', form.value.tel);
        if (this.selectedFile) {
          formData.append('photo', this.selectedFile, this.selectedFile.name);
        }
  
        this.authenticationService.signUp(formData).subscribe(
          response => {
            this.authenticationService.setSession(response);
            this.router.navigate(['']);
            console.log('Sign Up Successful', response);
          },
          error => {
            console.error('Sign Up Error', error);
          }
        );
      }
    }
  
    onFileChange(event: any) {
      const file = (event.target as HTMLInputElement).files![0];
      this.signupForm.patchValue({ photo: file });
      this.signupForm.get('photo')!.updateValueAndValidity();
    }
  }
  