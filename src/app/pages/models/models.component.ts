import { Component, inject } from '@angular/core';
import { AddModelModalComponent } from './modals/add.model.modal/add.model.modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-models',
  imports: [],
  templateUrl: './models.component.html',
  styles: ``,
})
export class ModelsComponent {

  private ngbModal = inject(NgbModal);

  openAddModelModal() {
    const modalRef = this.ngbModal.open(AddModelModalComponent, {
              size: 'lg',
              centered: true
    });    
  }
}
