// auth.component.ts
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject, OnInit } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    fb = inject(FormBuilder);
    http = inject(HttpClient);
    authService = inject(AuthService);
    router = inject(Router);
    authenticated = false;
    authenticating = false;

    loginForm = this.fb.nonNullable.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
    })

    ngOnInit(): void {
        const loggedIn: string | null = this.getLocalStorageItem(environment.JWT_TOKEN_KEY);

        if (loggedIn == null || loggedIn === '') {
            this.authenticated = false;
        } else {
            this.router.navigate(['/dashboard']);
        }
        
    }

    onSubmit(): void {
        this.authenticating = true;
        if (this.loginForm.valid) {
            this.authService.login(
                this.loginForm.value.email!,
                this.loginForm.value.password!).subscribe({
                    next: () => {
                        this.authenticating = false;
                        this.authenticated = true;
                        this.authService.currentUserSignal.set(this.getLocalStorageItem('auth'));
                        this.router.navigate(['/dashboard']);
                    },
                    error: (err) => {
                        console.error('Login error:', err);
                        this.authenticating = false;
                        this.authenticated = false;
                        alert('Login failed. Please check your credentials and try again.');
                    }
                })
        }
    }

    // Safe localStorage access for environments where localStorage is not available (e.g., SSR)
    private getLocalStorageItem(key: string): string | null {
        if (typeof window === 'undefined' || !('localStorage' in window)) {
            return null;
        }
        return window.localStorage.getItem(key);
    }
}