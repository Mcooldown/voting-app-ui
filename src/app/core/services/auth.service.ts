import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../environments/environment';
import { LoginRequest, LoginResponse, JwtPayload, UserRole } from '../models/user.model';

const TOKEN_KEY = 'voting_token';
const ROLE_KEY = 'voting_role';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private _token = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  private _role = signal<UserRole | null>(
    (localStorage.getItem(ROLE_KEY) as UserRole) ?? null
  );

  readonly isLoggedIn = computed(() => {
    const token = this._token();
    if (!token) return false;
    return !this.isTokenExpired(token);
  });

  readonly currentRole = computed((): UserRole | null => {
    if (!this.isLoggedIn()) return null;
    return this._role();
  });

  readonly isAdmin = computed(() => this.currentRole() === 'admin');

  login(credentials: LoginRequest) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials).pipe(
      tap((res) => {
        localStorage.setItem(TOKEN_KEY, res.data.token);
        localStorage.setItem(ROLE_KEY, res.data.user.role);
        this._token.set(res.data.token);
        this._role.set(res.data.user.role);
      })
    );
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    this._token.set(null);
    this._role.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this._token();
  }

  private isTokenExpired(token: string): boolean {
    try {
      const { exp } = jwtDecode<JwtPayload>(token);
      return Date.now() >= exp * 1000;
    } catch {
      return true;
    }
  }
}
