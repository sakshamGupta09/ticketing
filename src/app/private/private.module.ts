import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogoModule } from '@shared/logo/logo.module';
import { PrivateRoutingModule } from './private-routing.module';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';

import { LayoutComponent } from './layout/layout.component';
import { SidebarComponent } from './layout/components/sidebar/sidebar.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { BackdropComponent } from './layout/components/backdrop/backdrop.component';

@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    BackdropComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MatIconModule,
    MatButtonModule,
    LogoModule,
    MatRippleModule,
  ],
})
export class PrivateModule {}
