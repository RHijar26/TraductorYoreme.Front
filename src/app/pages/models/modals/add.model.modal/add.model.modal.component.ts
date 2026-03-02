import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-model-modal',
  imports: [],
  templateUrl: './add.model.modal.component.html',
  styles: ``,
})
export class AddModelModalComponent {
  private ngbActiveModal = inject(NgbActiveModal);


  close(){
    this.ngbActiveModal.close();
  }
}
