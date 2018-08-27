import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StarWarsModule } from './star-wars/star-wars.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { PageNotFoundComponent } from './shared/components/page-not-found.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    StarWarsModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
