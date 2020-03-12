import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {
  public registerForm: FormGroup;
  public user: any;
  public _idUser: number;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackbar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: [
        '',
        Validators.compose(
          [Validators.required, Validators.minLength(5)]
        )
      ],
      password: [
        '',
        Validators.compose(
          [Validators.required, Validators.minLength(5)]
        )
      ],
      firstName: [
        '',
        Validators.compose(
          [Validators.required, Validators.minLength(2)]
        )
      ],
      lastName: [
        '',
        Validators.compose(
          [Validators.required, Validators.minLength(2)]
        )
      ],
      eMail: [
        '',
        Validators.compose(
          [Validators.required, Validators.minLength(5)]
        )
      ],
    })
  }

  public get username(): AbstractControl {
    return this.registerForm.controls.username;
  }

  public get password(): AbstractControl {
    return this.registerForm.controls.password;
  }

  public get firstName(): AbstractControl {
    return this.registerForm.controls.firstName;
  }

  public get lastName(): AbstractControl {
    return this.registerForm.controls.lastName;
  }

  public get eMail(): AbstractControl {
    return this.registerForm.controls.eMail;
  }

  public register() {

    //local persistence of user
    this.userService.addNewCount(this.registerForm.value)
      // Road to home
      if (this._idUser === undefined) {
        this.router.navigate(['login'])
      }
      
    
    else {
      // TODO : some snackbar ti keep user informed
      this.snackbar.open(
        'sorry, your creat failed',
        '',
        {
          duration: 3500,
          verticalPosition: 'top'
        }

      )
      
      this.username.setValue('');
      this.password.setValue('');
      this.firstName.setValue('');
      this.lastName.setValue('');
      this.eMail.setValue('');
    }

  }

}
