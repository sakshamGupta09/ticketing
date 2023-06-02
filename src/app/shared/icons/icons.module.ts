import { NgModule } from '@angular/core';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';

import { faHouse } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [],
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class IconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faHouse);
  }
}
