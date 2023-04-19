import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ERROR_MESSAGES from '../../../core/constants/form-errors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup = {} as FormGroup;

  public hidePassword: boolean = true;

  public isLoading: boolean = false;

  readonly formErrors = ERROR_MESSAGES;

  public loginFailed: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.loginFailed = true;
    }, 4000);
  }
}
