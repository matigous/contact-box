import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './shared/components/header/header';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [App, Header],
  imports: [BrowserModule, AppRoutingModule, MatToolbarModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
