import { CommonModule } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RegionsService } from '../../../../services/regions.service';
import { Region } from '../../models/region';

@Component({
  selector: 'add-region-modal',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add.region.modal.component.html',
  styles: ``,
})
export class AddRegionModalComponent {
  private ngbActiveModal = inject(NgbActiveModal);  
  private regionService = inject(RegionsService);

  form = new FormGroup({
    name: new FormControl<string|null>(null, Validators.required),    
    description: new FormControl<string|null>(null, Validators.required),      
  });

  region: WritableSignal<Region | null> = signal(null)
  modalTitle = 'Registrar Nueva Región';

  ngOnInit(){
    if(this.region()){
      this.modalTitle = 'Editar Región';
      this.form.patchValue({
        name: this.region()?.name,
        description: this.region()?.description,        
      });
    } 
  }


  save(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      name: this.form.value.name,
      description: this.form.value.description,
    };

    this.regionService.register(payload).subscribe({
      next: (response) => {
        this.ngbActiveModal.close(response);
      },
      error: (error) => {        
      }
    });
      
  }
  
  close(){
    this.ngbActiveModal.close();
  }
}
