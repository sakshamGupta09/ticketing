import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  public isSidebarOpen = false;

  public menuClickHandler(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
