import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './admin-chatbot/home/home.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import { HomeModule } from './admin-chatbot/home/home.module';
import { NavbarComponent } from './admin-chatbot/components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
