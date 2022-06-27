import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() addClicked: EventEmitter<any> = new EventEmitter<any>();

  loginModal = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  // isLoginOpen:boolean = false;
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
  }

  // openLoginModal(){
  //   this.isLoginOpen = !this.isLoginOpen
  //   console.log(this.isLoginOpen)
  // }
  login(){
    debugger
    this.apiService.login(this.loginModal.value.email, this.loginModal.value.password).subscribe((res)=>{
      console.log(res)
    })
  }

}
