import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss'],
})
export class BackdropComponent {
  @Output() backdropClicked: EventEmitter<void>;

  constructor() {
    this.backdropClicked = new EventEmitter();
  }

  public backdropClickHandler(): void {
    this.backdropClicked.emit();
  }
}
