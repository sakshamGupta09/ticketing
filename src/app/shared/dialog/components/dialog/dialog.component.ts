import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { DIALOG_SIZE_MAP, DialogSizes } from '@shared/dialog/constants';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @Input() size: DialogSizes = 'md';

  readonly sizeWidthMap = DIALOG_SIZE_MAP;

  public dialogWidth!: string;

  @Output() closeClicked: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {
    this.dialogWidth = this.sizeWidthMap[this.size];
  }

  public closeClickHandler(): void {
    this.closeClicked.emit();
  }
}
