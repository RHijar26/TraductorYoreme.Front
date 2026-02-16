import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime,  } from 'rxjs';
import { TranslateService } from '../../services/translate-service.service';
import { RouterLink } from "@angular/router";
import { JoinUsComponent } from "../../components/join-us/join-us.component";

@Component({
  selector: 'app-translate',
  imports: [CommonModule, ReactiveFormsModule, RouterLink, JoinUsComponent],
  templateUrl: './translate.component.html',
  styles: ``,
})
export class TranslateComponent {

  private translateService = inject(TranslateService);

  languages = {
    source: {
      code: 'es',
      name: 'Español',
      nativeName: 'Español',
      active: true
    },
    target: {
      code: 'yor',
      name: 'Yoreme',
      nativeName: 'Yorem Nokki',
      active: false
    }
  };      

   @ViewChild('outputTextArea') OutPutTextArea!: ElementRef;

  form = new FormGroup({
    inputOriginText: new FormControl<string|null>(null),
    outputText: new FormControl<string|null>(null)
  });


  ngOnInit() {
    this.form.get('outputText')!.disable(); // Deshabilitar el campo de entrada inicialmente


   this.form.get('inputOriginText')!.statusChanges.pipe(
      debounceTime(500), // wait 500ms after the last input      
    ).subscribe(value => {      
      this.getTraduction(this.form.get('inputOriginText')!.value || '');
    });
  }   

  getTraduction(text: string){

    if(!text.trim()) return;

    this.OutPutTextArea.nativeElement.placeholder = 'Traduciendo...';
    this.form.get('outputText')!.setValue(null);


    this.translateService.getTranslation(text).subscribe({
      next: (response : any) => {        
        this.form.get('outputText')!.setValue(response.traduction);
        
      },  
      error: (error : any) => {
        console.error('Error al obtener la traducción:', error);
      }
    });
  }

  swapLanguages(): void {
    
    const temp = { ...this.languages.source };
    this.languages.source = { ...this.languages.target };
    this.languages.target = temp;
        
    this.languages.source.active = true;
    this.languages.target.active = false;
            
    
  }

  clearInput(): void {
    this.form.get('inputOriginText')!.setValue('');
  }

}
