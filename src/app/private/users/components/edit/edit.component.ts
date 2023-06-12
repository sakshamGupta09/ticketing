import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/models/user';
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
import { IAddUserRequest, componentTypes } from '../../models';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  @Input() user: IUser = {} as IUser;

  public form: FormGroup = {} as FormGroup;

  public isLoading = false;

  readonly rolesList = ALL_ROLES;

  readonly formErrors = FORM_ERRORS;

  @Output() closeClicked: EventEmitter<componentTypes> = new EventEmitter();

  @Output() userUpdated: EventEmitter<componentTypes> = new EventEmitter();

  constructor(private fb: FormBuilder, private service: UsersService) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      firstName: [
        this.user.first_name,
        [Validators.required, noSpaceValidator],
      ],
      lastName: [this.user.last_name, [Validators.required, noSpaceValidator]],
      email: [
        this.user.email,
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: [
            this.service.userExistsValidator('email', this.user.email),
          ],
          updateOn: 'blur',
        },
      ],
      phone: [
        this.user.phone,
        {
          validators: [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
          asyncValidators: [
            this.service.userExistsValidator('phone', this.user.phone),
          ],
          updateOn: 'blur',
        },
      ],
      roleId: [this.user.role_id, [Validators.required]],
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
    this.isLoading = true;
    const payload = this.getPayload();
    this.service.updateUser(this.user.role_id, payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.userUpdated.emit('EDIT');
      },
      error: () => {
        this.isLoading = false;
      },
    });
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

  public closeClickHandler(): void {
    this.closeClicked.emit('EDIT');
  }
}
