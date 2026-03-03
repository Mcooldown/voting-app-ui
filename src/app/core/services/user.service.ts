import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  User,
  UsersResponse,
  UserResponse,
  CreateUserRequest,
  UpdateUserRequest,
} from '../models/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/users`;

  getAll(): Observable<User[]> {
    return this.http.get<UsersResponse>(this.base).pipe(map((r) => r.data.users));
  }

  getById(id: string): Observable<User> {
    return this.http.get<UserResponse>(`${this.base}/${id}`).pipe(map((r) => r.data.user));
  }

  create(data: CreateUserRequest): Observable<User> {
    return this.http.post<UserResponse>(this.base, data).pipe(map((r) => r.data.user));
  }

  update(id: string, data: UpdateUserRequest): Observable<User> {
    return this.http.put<UserResponse>(`${this.base}/${id}`, data).pipe(map((r) => r.data.user));
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
