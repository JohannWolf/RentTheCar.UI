import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [    
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  searchForm: FormGroup;
  addUserForm: FormGroup;
  editUserForm: FormGroup;
  searchResults: any[] = [];
  roles: any[] = [];

  @ViewChild('addUserModal') addUserModal!: TemplateRef<any>;
  @ViewChild('editUserModal') editUserModal!: TemplateRef<any>;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.searchForm = this.fb.group({
      email: ['']
    });

    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [this.generatePassword(), Validators.required],
      phone: ['', Validators.required],
      roles: [[]]
    });

    this.editUserForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      phone: ['', Validators.required],
      roles: [[]]
    });
  }


  loadRoles(): void {
    /*this.roleService.getRoles().subscribe(roles => {
      this.roles = roles;
    });*/
    console.log("Load roles")
  }
onSearch(): void {
    /*const email = this.searchForm.get('email')?.value;
    this.userService.searchUsers(email).subscribe(users => {
      this.searchResults = users;
    });*/
    console.log("Search")
}

  openAddUserModal(): void {
    this.dialog.open(this.addUserModal);
  }

  openEditUserModal(user: any): void {
    this.editUserForm.patchValue(user);
    this.dialog.open(this.editUserModal);
  }

  onAddUser(): void {
    /*if (this.addUserForm.valid) {
      this.userService.addUser(this.addUserForm.value).subscribe(() => {
        // Handle success
      });
    }*/
      console.log("On add")
  }

  onEditUser(): void {
    /*if (this.editUserForm.valid) {
      this.userService.updateUser(this.editUserForm.value).subscribe(() => {
        // Handle success
      });
    }*/
      console.log("On edit")
  }

  onDeleteUser(): void {
    /*const userId = this.editUserForm.get('id')?.value;
    this.userService.deleteUser(userId).subscribe(() => {
      // Handle success
    });*/
    console.log("On delete")
  }

  generatePassword(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,.!@#$%^&*()_+';
    return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }
}
