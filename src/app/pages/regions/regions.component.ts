import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddRegionModalComponent } from './modals/add.region.modal/add.region.modal.component';

@Component({
  selector: 'app-regions',
  imports: [],
  templateUrl: './regions.component.html',
  styles: ``,
})
export class RegionsComponent {

  private ngbModal = inject(NgbModal);

  openAddRegionModal(){
    const modalRef = this.ngbModal.open(AddRegionModalComponent, {
            size: 'lg',
            centered: true
    });    
    
  }
}
