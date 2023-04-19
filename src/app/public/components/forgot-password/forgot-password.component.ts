import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ERROR_MESSAGES from 'src/app/core/constants/form-errors';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public form: FormGroup = {} as FormGroup;

  public isLoading: boolean = false;

  readonly formErrors = ERROR_MESSAGES;

  public emailVerificationFailed: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get email() {
    return this.form.get('email');
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.emailVerificationFailed = true;
    }, 3000);
  }
}
