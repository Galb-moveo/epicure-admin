import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LoginService } from '../services/login.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() addClicked: EventEmitter<any> = new EventEmitter<any>();

  loginModal = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });
  registerModal = new FormGroup({
    regEmail: new FormControl(),
    regPassword: new FormControl(),
    regName: new FormControl(),
  });
  errorMessage: any = '';
  token: any = {};
  isLogged: boolean = false;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private apiService: ApiService,
    private toastService: HotToastService
  ) {}

  ngOnInit(): void {}
  submitForm() {
    this.errorMessage = '';
    if (!this.loginModal.value.email || !this.loginModal.value.password) {
      return;
    }
    this.loginService
      .login(this.loginModal.value.email, this.loginModal.value.password)
      .subscribe(
        (response) => {
          console.log(response);
          this.loginModal.reset();
          this.router.navigate(['/chefs']);
          this.toastService.success('You have successfully logged in!')
        },
        (error) => {
          // console.error('email or password are not correct');
          this.loginModal.reset();
          this.toastService.error('Email or password are incorrect')
          this.errorMessage = error;
        },
      );
  }

  register() {
    this.apiService
      .register(
        this.registerModal.value.regEmail,
        this.registerModal.value.regPassword,
        this.registerModal.value.regName,
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.registerModal.reset();
          this.router.navigate(['/login']);
          this.toastService.success('You have successfully registered!')
        },
        (error) => {
          this.toastService.error('Please enter a valid fields')
          this.registerModal.reset();
          this.errorMessage = error;
        },
      );
  }
}
