import { Component, Output, EventEmitter } from '@angular/core';
import { IAddUserRequest, componentTypes } from '../../models';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ALL_ROLES } from '../../../../core/models/roles';
import FORM_ERRORS from '../../constants/form-errors';
import { UsersService } from '../../services/users.service';
import noSpaceValidator from '../../../../core/form-validators/no-space';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  public form: FormGroup = {} as FormGroup;

  public isLoading = false;

  readonly rolesList = ALL_ROLES;

  readonly formErrors = FORM_ERRORS;

  @Output() closeClicked: EventEmitter<componentTypes> = new EventEmitter();

  @Output() userAdded: EventEmitter<void> = new EventEmitter();

  constructor(private fb: FormBuilder, private service: UsersService) {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, noSpaceValidator]],
      lastName: ['', [Validators.required, noSpaceValidator]],
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: [this.service.userExistsValidator('email')],
          updateOn: 'blur',
        },
      ],
      phone: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
          asyncValidators: [this.service.userExistsValidator('phone')],
          updateOn: 'blur',
        },
      ],
      roleId: ['', [Validators.required]],
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
    this.isLoading = true;
    const payload = this.getPayload();
    this.service.addUser(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.userAdded.emit();
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  public closeClickHandler(): void {
    this.closeClicked.emit('ADD');
  }

  private getPayload(): IAddUserRequest {
    return {
      first_name: this.firstName.value,
      last_name: this.lastName.value,
      email: this.email.value,
      phone: this.phone.value,
      role_id: this.roleId.value,
    };
  }

  get firstName(): AbstractControl {
    return this.form.get('firstName')!;
  }

  get lastName(): AbstractControl {
    return this.form.get('lastName')!;
  }

  get email(): AbstractControl {
    return this.form.get('email')!;
  }

  get phone(): AbstractControl {
    return this.form.get('phone')!;
  }

  get roleId(): AbstractControl {
    return this.form.get('roleId')!;
  }
}
