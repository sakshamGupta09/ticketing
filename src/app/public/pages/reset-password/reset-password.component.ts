import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ERROR_MESSAGES from '../../../core/constants/form-errors';
import PATTERNS from '../../../core/constants/regex';
import { fieldsMatchValidator } from '../../../core/form-validators/confirm-password';
import { PublicService } from '../../services/public.service';
import { ActivatedRoute } from '@angular/router';
import { AlertTypes } from '@shared/alert/models';

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

  private authToken = '';

  public alertConfig: { type: AlertTypes; title: string };

  constructor(
    private fb: FormBuilder,
    private service: PublicService,
    private route: ActivatedRoute
  ) {
    this.alertConfig = { type: 'info', title: '' };
  }

  ngOnInit(): void {
    this.fetchRouteParams();
    this.initForm();
  }

  private fetchRouteParams(): void {
    this.authToken = this.route.snapshot.params['authToken'];
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

    this.service
      .changePassword(this.authToken, this.form.value.password)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.showAlert('success', response.message);
        },
        error: (error) => {
          this.isLoading = false;
          this.showAlert('error', error.message);
        },
      });
  }

  private showAlert(type: AlertTypes, title: string): void {
    this.alertConfig = { type, title };
  }
}
