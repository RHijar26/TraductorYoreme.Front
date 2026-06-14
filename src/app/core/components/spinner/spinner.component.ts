import { Component, inject } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [AsyncPipe],
  selector: 'app-spinner',
  template: `
    @if(isLoading$ | async) {
    <div class="overlay">
      <span class="loader"></span>
    </div>
    }
  `,
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  private _spinnerService = inject(SpinnerService);
  isLoading$ = this._spinnerService.isLoading$;
}
