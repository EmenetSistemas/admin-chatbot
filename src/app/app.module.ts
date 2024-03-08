import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './admin-chatbot/home/home.component';
import { RouterModule } from '@angular/router';
import { AppRoutes } from './app.routing';
import { HomeModule } from './admin-chatbot/home/home.module';
import { NavbarComponent } from './admin-chatbot/components/navbar/navbar.component';
import { SidenavComponent } from './admin-chatbot/components/sidenav/sidenav.component';
import { ConsultaComprobantesComponent } from './admin-chatbot/modules/comprobantes/consulta-comprobantes/consulta-comprobantes.component';
import { DropdownComponent } from './admin-chatbot/components/dropdown/dropdown.component';
import { DatatableComponent } from './admin-chatbot/components/datatable/datatable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PrevPdfComponent } from './admin-chatbot/components/prev-pdf/prev-pdf.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SidenavComponent,
    ConsultaComprobantesComponent,
    DropdownComponent,
    DatatableComponent,
    PrevPdfComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    HomeModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
