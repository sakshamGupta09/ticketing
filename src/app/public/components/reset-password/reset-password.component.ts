import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ERROR_MESSAGES from '../../../core/constants/form-errors';
import PATTERNS from '../../../core/constants/regex';
import { fieldsMatchValidator } from '../../../core/form-validators/confirm-password';
import { PublicService } from '../../services/public.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  public form: FormGroup = {} as FormGroup;

  public isLoading = false;

  readonly formErrors = ERROR_MESSAGES;

  public hidePassword = true;

  constructor(private fb: FormBuilder, private service: PublicService) {}

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

    this.service.changePassword(this.form.value.password).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }
}
