import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './component/alert/alert.component';
import { IconsModule } from '../icons/icons.module';

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, IconsModule],
  exports: [AlertComponent],
})
export class AlertModule {}
