import { Component, Input } from '@angular/core';
import { AlertTypes } from '../../models';
import ALERT_CONFIG from '../../constants';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent {
  @Input() type: AlertTypes = 'success';

  @Input() title = '';

  readonly alertConfig = ALERT_CONFIG;
}
