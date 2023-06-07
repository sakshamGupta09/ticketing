import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { DrawerComponent } from './drawer.component';
import { DrawerContentComponent } from './components/drawer-content/drawer-content.component';

@NgModule({
  declarations: [DrawerComponent, DrawerContentComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [DrawerComponent, DrawerContentComponent],
})
export class DrawerModule {}
