import { Component, signal, WritableSignal } from '@angular/core';
import { Lenguage } from '../../../../models/lenguage';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-phrase-modal',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add.phrase.modal.component.html',
  styles: ``,
})
export class AddPhraseModalComponent {  

  lenguages : WritableSignal<Array<Lenguage> | undefined> = signal(undefined);

  form = new FormGroup({
    phrase : new FormControl<string|null>(null, Validators.required),
    soruceLengauge: new FormControl<number|null>(null, Validators.required),
    targetLengauge: new FormControl<number|null>(null, Validators.required),
    traduction: new FormControl<string|null>(null, Validators.required),    
    region: new FormControl<number|null>(null, Validators.required),      
    model: new FormControl<number|null>(null, Validators.required),      
  });


  ngOnInit(){
    if(this.lenguages()){      
      this.form.controls.soruceLengauge.setValue(1)
      this.form.controls.targetLengauge.setValue(2);

      this.form.controls.soruceLengauge.disable();
      this.form.controls.targetLengauge.disable();
    }
  }


}
