import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppComponent } from '../app.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signUpInfo: { email: string; password: string } = {
    email: '',
    password: '',
  };
  SignUpSuccess!: any;
  constructor(private data: AppComponent, private http: DataService) {}
  addNewUser(signupform: NgForm) {
    this.http.signupUser(this.signUpInfo).subscribe((value: any) => {
      console.log(value);
      this.SignUpSuccess = value;
      signupform.resetForm({
        email: '',
        password: '',
      });
    });
  }
}
