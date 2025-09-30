import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../../service/user-service';
import {UserModel} from '../../../model/user/user-model';
import {filter} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';
import {forkJoin} from 'rxjs';

declare var bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-user',
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
  imports: [CommonModule, FormsModule]
})
export class UserComponent implements OnInit {
  users: UserModel[] = [];
  newUser: UserModel = {
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    address: ''
  };
  editingIndex: number | null = null;
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url === '/dashboard/users') {
          this.loadUsers();
        }
      });
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getAllUser().subscribe(users => {
      this.users = users;
      this.isLoading = false;
      this.cdr.detectChanges();
    });
  }

  addUser(): void {
    if (this.editingIndex !== null) {
      const userId = this.users[this.editingIndex].userId!;
      this.userService.updateUser(userId, this.newUser).subscribe(updated => {
        this.users[this.editingIndex!] = updated;
        this.editingIndex = null;
        this.newUser = {name: '', email: '', phoneNumber: '', password: '', address: ''};
        this.closeModal();
      });
    } else {
      this.userService.createUser(this.newUser).subscribe(created => {
        this.users.push(created);
        this.newUser = {name: '', email: '', phoneNumber: '', password: '', address: ''};
        this.closeModal();
      });
    }
  }

  editUser(user: UserModel): void {
    this.newUser = {...user};
    this.editingIndex = this.users.findIndex(u => u.userId === user.userId);
    const modal = new bootstrap.Modal(document.getElementById('addUserModal'));
    modal.show();
  }

  deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(() => {
      this.loadUsers();
    });
  }

  closeModal(): void {
    const modal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
    if (modal) modal.hide();
  }
}
