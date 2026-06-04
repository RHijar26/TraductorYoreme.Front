import { Component, OnInit, inject, signal } from '@angular/core';
import { Users } from '../../interfaces/GetUserResponse.interface';
import { UserService } from '../../services/users.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-catalog',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './users.catalog.component.html',
  styles: ``,
})
export class UsersCatalogComponent implements OnInit {
  private userService = inject(UserService);

  users: Users[] = [];
  filteredUsers = signal<Users[]>([]);

  isLoading = signal(false);
  currentPage = 1;
  pageSize = 100;
  hasNextPage = false;

  searchTerm = '';
  roleFilter = 'all';
  statusFilter = 'all';

  ngOnInit(): void {
    this.loadUsers();
  }

  get roleOptions(): string[] {
    return Array.from(new Set(this.users.map((user) => user.role))).filter((role) => !!role);
  }

  loadUsers(page: number = this.currentPage): void {
    this.isLoading.set(true);

    this.userService.getAll(page, this.pageSize).subscribe({
      next: (response) => {
        this.currentPage = response.page;
        this.pageSize = response.pageSize;
        this.users = response.data ?? [];
        this.hasNextPage = this.users.length === this.pageSize;
        this.applyFilters();
        this.isLoading.set(false);

        console.log('Usuarios cargados:', this.users);
        console.log('Usuarios Filtrados:', this.filteredUsers());
      },
      error: () => {
        this.users = [];
        this.filteredUsers.set([]);
        this.hasNextPage = false;
        this.isLoading.set(false);
      },
    });
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.searchTerm = target?.value ?? '';
    this.applyFilters();
  }

  onRoleFilterChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    this.roleFilter = target?.value ?? 'all';
    this.applyFilters();
  }

  onStatusFilterChange(event: Event): void {
    const target = event.target as HTMLSelectElement | null;
    this.statusFilter = target?.value ?? 'all';
    this.applyFilters();
  }

  previousPage(): void {
    if (this.currentPage <= 1 || this.isLoading()) {
      return;
    }

    this.loadUsers(this.currentPage - 1);
  }

  nextPage(): void {
    if (!this.hasNextPage || this.isLoading()) {
      return;
    }

    this.loadUsers(this.currentPage + 1);
  } 

  private applyFilters(): void {
    const search = this.searchTerm.trim().toLowerCase();
    const role = this.roleFilter.toLowerCase();
    const status = this.statusFilter.toLowerCase();

    this.filteredUsers.set(this.users.filter((user) => {
      const matchesSearch =
        !search ||
        user.fullName.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search);

      const matchesRole = role === 'all' || user.role.toLowerCase() === role;
      const matchesStatus =
        status === 'all' ||
        (status === 'active' && user.active) ||
        (status === 'suspended' && !user.active);

      return matchesSearch && matchesRole && matchesStatus;
    }));
  }


  transforImgName(fullName: string): string {
    console.log('Transformando nombre:', fullName);

    const names = fullName.split(' ').filter(name => name);
    if (names.length === 0) return 'X';
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
  }
}
