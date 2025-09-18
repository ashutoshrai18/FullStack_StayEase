import { Component } from '@angular/core';

interface User {
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.html',
  styleUrls: ['./user.css']
})
export class UserComponent {
  users: User[] = [
    { name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { name: 'Bob', email: 'bob@example.com', role: 'User' }
  ];

  addUser() {
    this.users.push({
      name: 'New User',
      email: 'new@example.com',
      role: 'User'
    });
  }

  editUser(user: User) {
    alert('Edit user: ' + user.name);
  }

  deleteUser(user: User) {
    this.users = this.users.filter(u => u !== user);
  }
}
