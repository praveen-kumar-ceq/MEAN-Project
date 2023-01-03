import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { DataService } from '../data.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  auth!: boolean;
  error!: string;
  initialValue: any = {
    email: '',
    password: '',
  };
  loginInfo: { email: string; password: string } = this.initialValue;
  constructor(
    private data: AppComponent,
    private http: DataService,
    private router: Router
  ) {}
  ngOnInit() {
    if (this.data.Auth) {
      this.router.navigateByUrl('');
    } else {
      this.auth = !this.data.Auth;
    }
  }

  addItem() {
    this.http.loginUser(this.loginInfo).subscribe({
      next: (value: any) => {
        if (value) {
          this.data.userInfo = value;
          this.data.Auth = true;
          const decoded: any = jwt_decode(value.token);
          console.log(decoded);
          localStorage.setItem('session', JSON.stringify(decoded));
          localStorage.setItem('token', JSON.stringify(value.token));
          const storageValue: any = localStorage.getItem('session');
          this.data.token = JSON.parse(storageValue);
          console.log(this.data.token);
          this.router.navigateByUrl('');
        }
      },
      error: (error: any) => {
        console.log(error);
        this.error = 'Auth Failed! UnAuthorized';
      },
    });
  }
}
