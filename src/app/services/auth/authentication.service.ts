import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from '../../models/jwt-payload.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenSubject = new BehaviorSubject<string>("");
  public token = this.tokenSubject.asObservable();

  private refreshTokenSubject = new BehaviorSubject<string>("");
  public refreshToken = this.refreshTokenSubject.asObservable();

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: any): any {
    return this.http.post(`${this.apiUrl}/authentication/login`, credentials);
  }

  storeTokens(token: string, refreshToken: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);

    this.tokenSubject.next(token);
    this.refreshTokenSubject.next(refreshToken);
  }

  getToken(): string {
    console.log('getToken called');
    return localStorage.getItem('token') || '';
  }

  getUser() {
    const token = this.getToken();
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      return decoded;
    }
    return null;
  }

  getRefreshToken(): string {
    return localStorage.getItem('refreshToken') || '';
  }

  isLoggedIn() {
    const token = this.getToken();
    return !!token; // You might want to add more checks like token expiry here
  }

  logout(): void {
    this.sendLogoutRequest().subscribe(
      (response) => {
        this.clearLocalStorageAndRedirect();
      },
      (error) => {
        console.error("Error during logout:", error);
        this.clearLocalStorageAndRedirect();
      }
    );
  }

  sendLogoutRequest(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (refreshToken) {
      return this.http.post(`${this.apiUrl}/authentication/logout`, {}, {
        headers: { 'RefreshToken': refreshToken }
      });
    } else {
      return of(null);
    }
  }

  clearLocalStorageAndRedirect(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.tokenSubject.next("");
    this.refreshTokenSubject.next("");
    this.router.navigate(['/login']);
  }
}
