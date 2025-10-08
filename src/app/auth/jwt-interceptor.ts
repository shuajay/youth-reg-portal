// interceptor to add JWT token to requests
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, of } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject (AuthService);
  const token = authService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    catchError((err) => {
      if (
        err.status === 401 ||
        err.status === 403 || 
        (err.error && err.error.message === 'Unauthorized')
      ) {
        console.error('Unauthorized request - logging out');
        alert('Session expired. Please log in again.');
        authService.logout();
      }
      return of(err);
    }
  )
)
};
