import { ConstantPool } from '@angular/compiler';
import { Component, inject, signal, Signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styles: ``,
})
export class HeaderComponent {
  router = inject(Router);

  currentUrl = signal<string>(this.router.url);

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.currentUrl.set(this.router.url);
    });
  }
}
