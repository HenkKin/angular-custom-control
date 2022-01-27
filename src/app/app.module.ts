import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { DatumInputComponent } from './datum-input/datum-input.component';
import { ControlNavigationDirective } from './control-navigation.directive';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [
    AppComponent,
    HelloComponent,
    DatumInputComponent,
    ControlNavigationDirective,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
