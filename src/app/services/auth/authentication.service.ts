import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

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

  getRefreshToken(): string {
    return localStorage.getItem('refreshToken') || '';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
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
