import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartPlugComponent } from './plugins/chart-plug/chart-plug.component';
import { CovidComponent } from './covid/covid.component';

import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './interceptors/api-interceptor.interceptor';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ChartPlugComponent,
    CovidComponent
  ],
  
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NgApexchartsModule,
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoicnVzaGlkaSIsImEiOiJja3c3bmxkNm4wem9rMm5yaG1rM3BqdHFiIn0.wKthApkGq1SYb831UZafMQ'
    }),
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
