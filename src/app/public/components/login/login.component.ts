import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ERROR_MESSAGES from '../../../core/constants/form-errors';
import { PublicService } from '../../services/public.service';
import { IHttpErrorResponse } from 'src/app/core/models/api-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup = {} as FormGroup;

  public hidePassword = true;

  public isLoading = false;

  readonly formErrors = ERROR_MESSAGES;

  public errorMessage: string = '';

  constructor(private fb: FormBuilder, private service: PublicService) {}

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
    this.errorMessage = '';

    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
    this.isLoading = true;

    this.service.login(this.form.value).subscribe({
      next: (response) => {
        this.postLoginSuccess();
        this.isLoading = false;
      },
      error: (error: IHttpErrorResponse) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
  }

  private postLoginSuccess(): void {}
}
