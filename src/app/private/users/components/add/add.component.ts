import { Component, Output, EventEmitter } from '@angular/core';
import { componentTypes } from '../../models';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  public form: FormGroup = {} as FormGroup;

  public isLoading = false;

  @Output() closeClicked: EventEmitter<componentTypes> = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  public closeClickHandler(): void {
    this.closeClicked.emit('ADD');
  }

  private initForm(): void {
    console.error();
  }
}
