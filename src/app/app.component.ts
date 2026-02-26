import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./layout/header/header.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent],
    template: 
    `
        <app-header></app-header>

        <router-outlet />        

        
    `,        
})
export class AppComponent implements OnInit {
    ngOnInit(): void {        
    }

}