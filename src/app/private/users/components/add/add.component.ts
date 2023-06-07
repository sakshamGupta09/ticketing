import { Component, Output, EventEmitter } from '@angular/core';
import { componentTypes } from '../../models';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  public isLoading: boolean = false;

  @Output() closeClicked: EventEmitter<componentTypes> = new EventEmitter();

  public closeClickHandler(): void {
    this.closeClicked.emit('ADD');
  }
}
