import { ChangeDetectionStrategy } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  users!: any;
  token: any;
  constructor(
    private http: DataService,
    private data: AppComponent,
    private router: Router
  ) {
    const value: any = localStorage.getItem('token');
    this.token = JSON.parse(value);
  }
  ngOnInit(): void {
    if (this.data.Auth) {
      const newStr = `Bearer ${this.token}`;
      this.http.getUsers(newStr).subscribe({
        next: (value: any) => {
          console.log(value);
          this.users = value.data;
        },
        error: (error) => {
          if (error.status === 401) {
            this.data.logoutHandler();
          }
        },
      });
    } else {
      this.data.logoutHandler();
    }
  }
}
