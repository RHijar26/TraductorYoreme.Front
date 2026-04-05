import { inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoModalComponent } from '../modals/info.modal/info.modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private ngbModal = inject(NgbModal);
  private router = inject(Router);
  

  showErrorModal(err: HttpErrorResponse) {
    const modalRef = this.ngbModal.open(InfoModalComponent, {
      size: 'lg',
      centered: true
    });
    
    modalRef.componentInstance.message = err.error.error ?? 'Hubo un Error, Intente de nuevo más tarde.';    
  }

}
