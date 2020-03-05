import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {
  public registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
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

  public register(): void {
    console.log('Je veux créer un compte');
  }

}
