import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerModal = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    name: new FormControl(),
  });
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  register() {
    debugger;
    this.apiService
      .register(
        this.registerModal.value.email,
        this.registerModal.value.password,
        this.registerModal.value.name,
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
}
