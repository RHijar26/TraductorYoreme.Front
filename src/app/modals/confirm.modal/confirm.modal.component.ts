import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  imports: [],
  templateUrl: './confirm.modal.component.html',
  styles: ``,
})
export class ConfirmModalComponent {

  private ngbActiveModal = inject(NgbActiveModal);  

  @Input() title : string = '';
  @Input() message: string = '';
    
  confimrAction() {
    this.ngbActiveModal.close(true);  
  }
  closeModal() {
    this.ngbActiveModal.close();
  }
}
