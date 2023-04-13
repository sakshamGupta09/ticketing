import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ERROR_MESSAGES from 'src/app/core/constants/form-errors';
import PATTERNS from 'src/app/core/constants/regex';
import { fieldsMatchValidator } from 'src/app/core/form-validators/confirm-password';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  public form: FormGroup = {} as FormGroup;

  public isLoading: boolean = false;

  readonly formErrors = ERROR_MESSAGES;

  public hidePassword: boolean = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group(
      {
        password: [
          '',
          [Validators.required, Validators.pattern(PATTERNS.STRONG_PASSWORD)],
        ],
        confirmPassword: [
          '',
          [Validators.required, Validators.pattern(PATTERNS.STRONG_PASSWORD)],
        ],
      },
      { validators: fieldsMatchValidator }
    );
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
    this.isLoading = true;
  }
}
