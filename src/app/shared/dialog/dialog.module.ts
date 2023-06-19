import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [DialogComponent],
})
export class DialogModule {}
