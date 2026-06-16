import { Component, inject, signal } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPhraseModalComponent } from './modals/add.phrase.modal/add.phrase.modal.component';
import { LenguageService } from '../../services/lenguage..service';
import { HttpResourceRef } from '@angular/common/http';
import { Lenguage } from '../../models/lenguage';
import { Region } from '../../models/region';
import { ModelsService } from '../../services/models.service';
import { RegionsService } from '../../services/regions.service';
import { PhraseService } from './services/phrase.service';
import { Phrases } from './interfaces/GetPhraseResponse.interface';

@Component({
  selector: 'app-phrases',
  imports: [],
  templateUrl: './phrases.component.html',
})
export class PhrasesComponent {

  ngbModal = inject(NgbModal);
  private lenguageService = inject(LenguageService);
  private regionService = inject(RegionsService);
  private modelService = inject(ModelsService);
  private phraseService = inject(PhraseService);

  lenguages: HttpResourceRef<Array<Lenguage> | undefined> =
    this.lenguageService.getAll();

  regions: HttpResourceRef<Array<Region> | undefined> =
    this.regionService.getAllResource();

  models: HttpResourceRef<Array<any> | undefined> =
    this.modelService.getAllResource();

  phrases: Phrases[] = [];
  filteredPhrases = signal<Phrases[]>([]);
  currentPage = 1;
  pageSize = 100;
  hasNextPage = false;
  isLoading = signal(false);


  ngOnInit() {
    this.loadPhrases();
  }

  loadPhrases() {
    this.phraseService.getAll(this.currentPage, this.pageSize).subscribe({
      next: (response) => {

        console.log(response);
        this.currentPage = response.page;
        this.pageSize = response.pageSize;
        this.phrases = response.data ?? [];
        this.hasNextPage = this.phrases.length === this.pageSize;        
        this.applyFilters();
        this.isLoading.set(false);
      },      
    });
  }

  private applyFilters(): void {
    
    this.filteredPhrases.set(this.phrases);
  }

  openAddPhraseModal(){    
    const modalRef = this.ngbModal.open(AddPhraseModalComponent, {
            size: 'lg',
            centered: true
    });    

    modalRef.componentInstance.lenguages.set(this.lenguages.value());    
    modalRef.componentInstance.regions.set(this.regions.value());    
    modalRef.componentInstance.models.set(this.models.value());
  }   

}
