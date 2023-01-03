import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import jwt_decode from 'jwt-decode';
import { UserInfo } from './interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'post-request';
  userInfo!: Object;
  Auth!: boolean;
  token!: any;
  constructor(private data: DataService, private router: Router) {}
  ngOnInit() {
    const storageValue: any = localStorage.getItem('session');
    if (storageValue) {
      console.log(storageValue);
      this.token = JSON.parse(storageValue);
      if (this.token) {
        console.log(this.token);
        this.Auth = true;
      } else {
        console.log(this.token);
        this.Auth = false;
        this.router.navigate(['login']);
      }
    } else {
      console.log(storageValue);
      this.Auth = false;
      this.router.navigate(['login']);
    }
  }

  // loginHandler() {
  //   this.loginValue = true;
  // }

  // signUpHandler() {
  //   console.log('signup is working');
  //   this.loginValue = false;
  // }

  // addNewUser(newItem: any) {
  //   this.data.signupUser(newItem).subscribe((value: any) => {
  //     console.log(value);
  //   });
  // }

  addItem(newItem: any) {
    this.data.loginUser(newItem).subscribe((value: any) => {
      if (value) {
        this.userInfo = value;
        this.Auth = true;
        const decoded: any = jwt_decode(value.token);
        console.log(decoded);
        localStorage.setItem('session', JSON.stringify(decoded));
        localStorage.setItem('token', JSON.stringify(value.token));
        const storageValue: any = localStorage.getItem('session');
        this.token = JSON.parse(storageValue);
        console.log(this.token);
      }
    });
  }

  logoutHandler() {
    this.userInfo = {};
    localStorage.removeItem('session');
    localStorage.removeItem('token');
    this.token = {};
    this.Auth = false;
    console.log(this);
    this.router.navigateByUrl('login');
  }
}
