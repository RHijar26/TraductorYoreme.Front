import { Component, inject, signal, WritableSignal } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModelsService } from '../../../../services/models.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Model } from '../../models/model';
import { single } from 'rxjs';

@Component({
  selector: 'add-model-modal',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add.model.modal.component.html',
  styles: ``,
})
export class AddModelModalComponent {
  private ngbActiveModal = inject(NgbActiveModal);

  modelService = inject(ModelsService)
  
  form = new FormGroup({
    name: new FormControl<string|null>(null, Validators.required),    
    description: new FormControl<string|null>(null, Validators.required),      
  });

  model: WritableSignal<Model | null> = signal(null)

  modalTitle = 'Registrar Nuevo Modelo';

  ngOnInit(){
    console.log(this.model());
    if(this.model()){
      this.modalTitle = 'Modificar Modelo';

      this.form.patchValue({
        name: this.model()?.name,
        description: this.model()?.description,        
      });
    }
  }

  submit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const payLoad = {
      name: this.form.get('name')?.value,
      description: this.form.get('description')?.value,        
    }

    //Update
    if(this.model()?.id){
      
    }else{   //SAVE   
      this.modelService.register(payLoad).subscribe({
        next: (response) => {
          this.ngbActiveModal.close(true);
        },
        error: (err) => {
          console.error('Error al registrar el modelo', err);        
        }
      });
    }

  }

  close(){
    this.ngbActiveModal.close();
  }
}
