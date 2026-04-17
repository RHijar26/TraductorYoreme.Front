import { Component, inject, signal, WritableSignal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddRegionModalComponent } from './modals/add.region.modal/add.region.modal.component';
import { RegionsService } from '../../services/regions.service';
import { Region } from './models/region';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { take } from 'rxjs';
import { ConfirmModalComponent } from '../../modals/confirm.modal/confirm.modal.component';

@Component({
  selector: 'app-regions',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './regions.component.html',
  styles: ``,
})
export class RegionsComponent {

  private ngbModal = inject(NgbModal);
  private regionService = inject(RegionsService);

  regions: WritableSignal<Array<Region>> = signal([]) ;

  ngOnInit(){
    this.reset();
  }

  reset() {
    this.regionService.getAll().subscribe({
      next: (response) => {
        this.regions.set(response.data);
      }
    });
  }

  openAddRegionModal(){
    const modalRef = this.ngbModal.open(AddRegionModalComponent, {
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

  openEditRegionModal(region: Region){
    const modalRef = this.ngbModal.open(AddRegionModalComponent, {
            size: 'lg',
            centered: true
    });

    modalRef.componentInstance.region.set(region);


    modalRef.closed
    .pipe(take(1))
    .subscribe((response: any) => {      
      if(response)
        this.reset();
    });
  }

  openDeleteRegionModal(region: Region){
    const modalRef = this.ngbModal.open(ConfirmModalComponent, {
              size: 'lg',
              centered: true
     });

    modalRef.componentInstance.title = '¿Estás seguro?';
    modalRef.componentInstance.message = '¿Deseas eliminar esta región?';

    modalRef.closed
    .pipe(take(1))
    .subscribe((response: any) => {            
      if(response)
        this.deleteRegion(region);
    });
  }

  deleteRegion(region: Region) {
    this.regionService.delete(region.id).subscribe({
      next: (response) => {
        this.reset();
        }
      });
    }
}
