import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['./lockscreen.component.scss']
})
export class LockscreenComponent {
  password: string = '';
  year: number = new Date().getFullYear();
  
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  unlockScreen(): void {
    // Get the hashed password from local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const storedHashedPassword = currentUser.user?.password;

    if (storedHashedPassword) {
      this.authService.comparePasswords(this.password, storedHashedPassword).then(isMatch => {
        if (isMatch) {
          // Password is correct, unlock the screen
          this.router.navigate(['/']); // Redirect to the intended page
        } else {
          // Password is incorrect
          alert('Incorrect password');
        }
      }).catch(error => {
        console.error('Password comparison failed:', error);
        alert('An error occurred');
      });
    } else {
      alert('No stored password found');
    }
  }
}
