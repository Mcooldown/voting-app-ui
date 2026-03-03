import { Component, inject, signal, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';
import { User, UpdateUserRequest } from '../../../core/models/user.model';

type DialogMode = 'create' | 'edit';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class UsersComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  users = signal<User[]>([]);
  loading = signal(false);
  errorMsg = signal('');
  successMsg = signal('');

  // Dialog state
  dialogOpen = signal(false);
  dialogMode = signal<DialogMode>('create');
  dialogLoading = signal(false);
  dialogError = signal('');
  editingId = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', []],
  });

  ngOnInit() { this.loadUsers(); }

  loadUsers() {
    this.loading.set(true);
    this.userService.getAll().subscribe({
      next: (list) => { this.users.set(list); this.loading.set(false); },
      error: () => { this.errorMsg.set('Failed to load users.'); this.loading.set(false); },
    });
  }

  openCreate() {
    this.dialogMode.set('create');
    this.editingId.set(null);
    this.form.reset({ name: '', email: '', password: '' });
    this.form.controls.password.setValidators([Validators.required, Validators.minLength(6)]);
    this.form.controls.password.updateValueAndValidity();
    this.dialogError.set('');
    this.dialogOpen.set(true);
  }

  openEdit(user: User) {
    this.dialogMode.set('edit');
    this.editingId.set(user._id);
    this.form.reset({ name: user.name, email: user.email, password: '' });
    this.form.controls.password.setValidators([Validators.minLength(6)]);
    this.form.controls.password.updateValueAndValidity();
    this.dialogError.set('');
    this.dialogOpen.set(true);
  }

  closeDialog() { this.dialogOpen.set(false); }

  saveUser() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.dialogLoading.set(true);
    this.dialogError.set('');
    const { name, email, password } = this.form.getRawValue();

    const editPayload: UpdateUserRequest = { name, email };
    if (password) editPayload.password = password;

    const obs$ = this.dialogMode() === 'create'
      ? this.userService.create({ name, email, password })
      : this.userService.update(this.editingId()!, editPayload);

    obs$.subscribe({
      next: () => {
        this.dialogOpen.set(false);
        this.dialogLoading.set(false);
        this.successMsg.set(this.dialogMode() === 'create' ? 'User created.' : 'User updated.');
        setTimeout(() => this.successMsg.set(''), 3000);
        this.loadUsers();
      },
      error: (err) => {
        this.dialogError.set(err?.error?.message ?? 'Operation failed.');
        this.dialogLoading.set(false);
      },
    });
  }

  deleteUser(id: string) {
    if (!confirm('Delete this user? This cannot be undone.')) return;
    this.userService.delete(id).subscribe({
      next: () => {
        this.successMsg.set('User deleted.');
        setTimeout(() => this.successMsg.set(''), 3000);
        this.loadUsers();
      },
      error: (err) => this.errorMsg.set(err?.error?.message ?? 'Delete failed.'),
    });
  }
}
