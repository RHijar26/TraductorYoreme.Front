import { Component, inject, input, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalInfoTypes } from '../../helpers/enums/modal.info.types.enum';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-modal',  
  templateUrl: './info.modal.component.html',
  imports: [ReactiveFormsModule,CommonModule],  
})
export class InfoModalComponent {
  private ngbActiveModal = inject(NgbActiveModal);  
  private sanitizer = inject(DomSanitizer);

  modalInfoTypes = ModalInfoTypes;


  @Input() type: ModalInfoTypes = ModalInfoTypes.Error;
  @Input() message: string = '';
    

  setTitle() : string{
    if(this.type === ModalInfoTypes.Error) return '¡Ha Ocurrido Un Error!'

    if(this.type === ModalInfoTypes.Succes) return '¡Guardado Exitosamente!'

    return '';
  } 

  setIcon(): SafeHtml{
    return     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6 text-red-600">
        <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" stroke-linecap="round" stroke-linejoin="round" />
    </svg>`;
  }


  
  closeModal() {
    this.ngbActiveModal.close();
  }
}
