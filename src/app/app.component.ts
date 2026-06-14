import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./layout/header/header.component";
import { SpinnerComponent } from "./core/components/spinner/spinner.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, SpinnerComponent],
    template: 
    `        
        <app-spinner />
        <router-outlet />        
    `,        
})
export class AppComponent implements OnInit {
    ngOnInit(): void {        
    }

}