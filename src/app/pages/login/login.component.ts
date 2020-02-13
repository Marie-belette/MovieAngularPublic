import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  public get login(): AbstractControl {
    return this.loginForm.controls.login;
  }

  public get password(): AbstractControl {
    return this.loginForm.controls.password;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: [
        '',
        Validators.compose(
          [Validators.required, Validators.minLength(5)]
        )
      ],
      password: [
        '',
        Validators.compose (
          [Validators.required, Validators.minLength(8)]
        )
      ]
    })
  }

  public doLogin(): void {
    //Local persistence of user
    if (this.userService.authenticate(this.loginForm.value)) {
      this.router.navigate(['home']);
    } else {
      this.login.setValue('');
      this.password.setValue('');
    }
    // Road to home

  }

}
