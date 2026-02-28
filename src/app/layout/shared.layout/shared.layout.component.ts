import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-shared.layout',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './shared.layout.component.html',
  styles: ``,
})
export class SharedLayoutComponent {

}
