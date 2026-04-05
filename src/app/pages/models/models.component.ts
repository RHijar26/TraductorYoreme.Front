import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AddModelModalComponent } from './modals/add.model.modal/add.model.modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModelsService } from '../../services/models.service';
import { Model } from './models/model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { take } from 'rxjs';

@Component({
  selector: 'app-models',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './models.component.html',
  styles: ``,
})
export class ModelsComponent {

  private ngbModal = inject(NgbModal);
  private modelService = inject(ModelsService);

  models: WritableSignal<Array<Model>> = signal([]) ;


  ngOnInit(){
    this.reset();
  }

  reset() {
    this.modelService.getAll().subscribe({
      next: (response) => {        
        this.models.set(response.data);        
      }      
    });
  }

  openAddModelModal() {
    const modalRef = this.ngbModal.open(AddModelModalComponent, {
              size: 'lg',
              centered: true
    });    

    modalRef.closed
    .pipe(take(1))
    .subscribe((response: any) => {
      if(response)
        this.reset();
    }); 
  }

  openConfigureModelModal(model: Model) {
    const modalRef = this.ngbModal.open(AddModelModalComponent, {
              size: 'lg',
              centered: true
    });    

    modalRef.componentInstance.model.set(model);

    modalRef.closed
    .pipe(take(1))
    .subscribe((response: any) => {      
      if(response)
        this.reset();
    });
  }

}
