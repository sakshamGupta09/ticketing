import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-drawer-content',
  templateUrl: './drawer-content.component.html',
  styleUrls: ['./drawer-content.component.scss'],
})
export class DrawerContentComponent {
  @Output() closeClicked: EventEmitter<void> = new EventEmitter();

  public closeClickHandler(): void {
    this.closeClicked.emit();
  }
}
