import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { componentTypes } from '../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ALL_ROLES } from 'src/app/core/models/roles';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  public form: FormGroup = {} as FormGroup;

  public isLoading = false;

  readonly rolesList = ALL_ROLES;

  @Output() closeClicked: EventEmitter<componentTypes> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  ngOnInit(): void {}

  private initForm(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      roleId: ['', [Validators.required]],
    });
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
  }

  public closeClickHandler(): void {
    this.closeClicked.emit('ADD');
  }
}
