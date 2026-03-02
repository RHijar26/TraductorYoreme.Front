import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-region-modal',
  imports: [],
  templateUrl: './add.region.modal.component.html',
  styles: ``,
})
export class AddRegionModalComponent {
  private ngbActiveModal = inject(NgbActiveModal);  

  
  close(){
    this.ngbActiveModal.close();
  }
}
