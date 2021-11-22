import { Component } from '@angular/core';
import { CovidComponent } from './covid/covid.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    CovidComponent,
  ]
})
export class AppComponent {
  title = 'etiqa';

}
