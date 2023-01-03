import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  getUsers(token: any) {
    return this.http.get('http://localhost:4000/api/v1/books', {
      headers: {
        Authorization: token,
      },
    });
  }

  postUser(user: object, token: any) {
    const Value = 'Bearer' + ' ' + token;
    console.log(Value);
    return this.http.post('http://localhost:4000/api/v1/books', user, {
      headers: {
        Authorization: Value,
      },
    });
  }

  checkProductAvailable(user: object, token: any) {
    const Value = 'Bearer' + ' ' + token;
    console.log(Value);
    return this.http.post('http://localhost:4000/api/v1/books/find', user, {
      headers: {
        Authorization: Value,
      },
    });
  }

  loginUser(userdata: Object) {
    return this.http.post('http://localhost:4000/api/v1/users/login', userdata);
  }

  signupUser(userdata: Object) {
    return this.http.post(
      'http://localhost:4000/api/v1/users/signup',
      userdata
    );
  }
}
