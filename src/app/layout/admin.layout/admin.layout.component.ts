import { Component } from '@angular/core';
import { SideNavBarComponent } from "./components/side.nav.bar/side.nav.bar.component";
import { HeaderComponent } from "./components/header/header.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-admin.layout',
  imports: [SideNavBarComponent, HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './admin.layout.component.html',
  styles: ``,
})
export class AdminLayoutComponent {

}
