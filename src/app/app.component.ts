import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    LoginComponent,
    NavbarComponent,
    CommonModule
],
  template: `
    <ng-container *ngIf="showNavbar()">
      <app-navbar></app-navbar>
    </ng-container>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'RentTheCar';
  private router = inject(Router);

  showNavbar(): boolean {
    return this.router.url !== '/login';
  }
}