import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  bookinfo: { name: string; price: number; rating: number } = {
    name: '',
    price: 0,
    rating: 0,
  };
  token: any;
  nameAvailable!: any;
  status!: any;
  constructor(private data: DataService) {
    const value: any = localStorage.getItem('token');
    this.token = JSON.parse(value);
  }

  checkUser(bookinfoname: NgModel) {
    if (bookinfoname.valid) {
      this.data
        .checkProductAvailable({ name: this.bookinfo.name }, this.token)
        .subscribe({
          next: (value: any) => {
            if (value.status === 'available') {
              this.nameAvailable = {
                status: true,
                message: 'Name is available',
              };
            } else {
              this.nameAvailable = {
                status: false,
                message: 'Name is not available',
              };
            }
          },
          error: (err) => {},
        });
    } else {
      console.log(bookinfoname.errors);
      let message;
      if (bookinfoname.errors) {
        const statusRequired =
          bookinfoname.errors && bookinfoname.errors['required'];
        const statusmin =
          (bookinfoname.errors && bookinfoname.errors['minlength']) ||
          bookinfoname.errors['maxlength'];
        if (statusRequired) {
          message = 'name field could not empty';
        }
        if (statusmin) {
          message = 'name should have length greater than 8 and less than 20';
        }
      }
      this.nameAvailable = {
        status: false,
        message: message,
      };
    }
  }
  createUser(usersForm: NgForm) {
    if (this.nameAvailable && this.nameAvailable.status) {
      this.data.postUser(this.bookinfo, this.token).subscribe((value) => {
        this.status = value;
        console.log(value);
        usersForm.resetForm({
          name: '',
          price: 0,
          rating: 0,
        });
        this.nameAvailable = null;
      });
    }
  }
}
