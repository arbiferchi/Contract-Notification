import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;

  // set the current year
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
  ) {

  }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
       
      this.router.navigate(['/']);
    }
    
 
  // Initialize the form with controls and validators
  this.loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  // Get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['/'] || '/';
}

  // Convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit(): void {
    this.submitted = true;
    console.log('Form Submitted'); // Add this line for debugging


    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(
      response => {
        this.authService.setSession(response);
        this.router.navigate([this.returnUrl]);
      },
      error => {
        console.error('Login Error', error);
        this.error = error;
      }
    );
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType(): void {
    this.fieldTextType = !this.fieldTextType;
  }
}
