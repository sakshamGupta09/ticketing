import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ERROR_MESSAGES from '../../../core/constants/form-errors';
import { PublicService } from '../../services/public.service';
import { IHttpErrorResponse } from '../../../core/models/api-response';
import { AuthService } from '../../../core/services/auth.service';
import { ILoginData } from '../../../core/models/login-response';
import { ActivatedRoute, Router } from '@angular/router';

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

  public errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private service: PublicService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
        this.postLoginSuccess(response.data);
        this.isLoading = false;
      },
      error: (error: IHttpErrorResponse) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
  }

  private postLoginSuccess(data: ILoginData): void {
    this.authService.setLoginData(data);
    const redirectUrl =
      this.route.snapshot.queryParams['redirectUrl'] || '/app/dashboard';
    this.router.navigate([redirectUrl], { replaceUrl: true });
  }
}
