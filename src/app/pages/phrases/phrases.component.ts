import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPhraseModalComponent } from './modals/add.phrase.modal/add.phrase.modal.component';

@Component({
  selector: 'app-phrases',
  imports: [],
  templateUrl: './phrases.component.html',
})
export class PhrasesComponent {

  ngbModal = inject(NgbModal);


  openAddPhraseModal(){
    const modalRef = this.ngbModal.open(AddPhraseModalComponent, {
            size: 'lg',
            centered: true
    });    
    
  }

}
