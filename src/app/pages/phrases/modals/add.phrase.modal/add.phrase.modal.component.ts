import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Lenguage } from '../../../../models/lenguage';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Region } from '../../../../models/region';
import { Model } from '../../../../models/model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PhraseService } from '../../services/phrase.service';

@Component({
  selector: 'app-add-phrase-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add.phrase.modal.component.html',
  styles: ``,
})
export class AddPhraseModalComponent {  
  private ngbActiveModal = inject(NgbActiveModal);
  private phraseService = inject(PhraseService);

  lenguages : WritableSignal<Array<Lenguage> | undefined> = signal(undefined);
  regions : WritableSignal<Array<Region> | undefined> = signal(undefined);
  models : WritableSignal<Array<Model> | undefined> = signal(undefined);

  form = new FormGroup({
    phrase : new FormControl<string|null>(null, Validators.required),
    sourceLanguage: new FormControl<number|null>(null, Validators.required),
    targetLanguage: new FormControl<number|null>(null, Validators.required),
    traduction: new FormControl<string|null>(null, Validators.required),    
    region: new FormControl<number|null>(null, Validators.required),      
    model: new FormControl<number|null>(null, Validators.required),      
  });


  ngOnInit(){
    if(this.lenguages()){      
      this.form.controls.sourceLanguage.setValue(1)
      this.form.controls.targetLanguage.setValue(2);

      this.form.controls.sourceLanguage.disable();
      this.form.controls.targetLanguage.disable();
    }
  }

  submit(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      sourceLanguage: this.form.get('sourceLanguage')?.value,
      targetLanguage: this.form.get('targetLanguage')?.value,
      regionId: this.form.get('region')?.value,
      modelId: this.form.get('model')?.value,
      phrase: this.form.get('phrase')?.value,
      traduction: this.form.get('traduction')?.value,
    };

    this.phraseService.register(payload).subscribe({
      next: (response) => {
        this.ngbActiveModal.close(true);
      },
      error: (err) => {
        console.error('Error al registrar la frase', err);        
      }
    });

  }

  close(){
    this.ngbActiveModal.close();
  }


}
