import { ConstantPool } from '@angular/compiler';
import { Component, inject, signal, Signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { TokenService } from '../../core/services/token.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {
  router = inject(Router);
  authService = inject(AuthService);

  currentUrl = signal<string>(this.router.url);

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.currentUrl.set(this.router.url);
    });
  }

  
  logout(){
    this.authService.logout();
  }

}
