import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AuthenticationService } from '../services/auth/authentication.service'; // Your authentication service

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    // Check if user is already logged in and redirect to homepage
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/']);
    } else {
      this.errorMessage = ''; // Initialize with an empty string when not logged in
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        rememberMe: false // Set rememberMe to false by default
      };

      this.authenticationService.login(credentials).subscribe(
        (response: any) => {
          // Store token and refresh token 
          this.authenticationService.storeTokens(response.token, response.refreshToken);

          // Redirect to homepage after successful login
          this.router.navigate(['/']);
        },
        (error: { error: string }) => {
          this.errorMessage = error.error; // Set the error message if there's an error
          this._snackBar.open(this.errorMessage, 'Close', {
            duration: 5000,
            panelClass: ['error-snackbar'] 
          });
        }
      );
    }
  }
}
