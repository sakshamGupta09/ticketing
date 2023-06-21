import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ERROR_MESSAGES from '../../../core/constants/form-errors';

import { PublicService } from '../../services/public.service';
import { AlertTypes } from '@shared/alert/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  public form: FormGroup = {} as FormGroup;

  public isLoading = false;

  readonly formErrors = ERROR_MESSAGES;

  public alertConfig: { type: AlertTypes; title: string };

  constructor(
    private fb: FormBuilder,
    private service: PublicService,
    private router: Router
  ) {
    this.alertConfig = { type: 'info', title: '' };
  }

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

    this.service.sendResetPasswordMail(this.form.value.email).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/auth/email-sent']);
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
