import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ERROR_MESSAGES from '../../../core/constants/form-errors';
import { PublicService } from '../../services/public.service';

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

  public loginFailed = false;

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
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
    this.isLoading = true;

    this.service.login(this.form.value).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.loginFailed = true;
      },
    });
  }
}
