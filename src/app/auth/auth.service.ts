import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ApiService {
  
  currentUserSignal = signal<any | undefined | null>(undefined);
  private router = inject(Router);

  constructor(http: HttpClient) {
    super(http);
    this.server = environment.auth_url.api;
  }

  getToken(): string | null {
    return localStorage.getItem('auth');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('auth');
    localStorage.removeItem(environment.JWT_TOKEN_KEY);
    localStorage.removeItem(environment.JWT_REFRESH_TOKEN_KEY);
    this.router.navigate(['/']);
  }

  login(username: string, password: string) {
    const url = `${environment.auth_url.auth_base}/login`;
    return this.post<any>(url, { username, password })
      .pipe(
        map((response) => {
          if (response.token) {
            localStorage.setItem('auth', response.token);
            localStorage.setItem(environment.JWT_TOKEN_KEY, response.token);
            
            // Store refresh token if available
            if (response.refreshToken) {
              localStorage.setItem(environment.JWT_REFRESH_TOKEN_KEY, response.refreshToken);
            }
          }
          return response;
        })
      );
  }
}
