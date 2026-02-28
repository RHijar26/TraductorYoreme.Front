import { Component } from '@angular/core';
import { SideNavBarComponent } from "./components/side.nav.bar/side.nav.bar.component";
import { HeaderComponent } from "./components/header/header.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin.layout',
  imports: [SideNavBarComponent, HeaderComponent, RouterOutlet],
  templateUrl: './admin.layout.component.html',
  styles: ``,
})
export class AdminLayoutComponent {

}
