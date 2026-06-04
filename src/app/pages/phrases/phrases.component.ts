import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddPhraseModalComponent } from './modals/add.phrase.modal/add.phrase.modal.component';
import { LenguageService } from '../../services/lenguage..service';
import { HttpResourceRef } from '@angular/common/http';
import { Lenguage } from '../../models/lenguage';
import { Region } from '../../models/region';
import { ModelsService } from '../../services/models.service';
import { RegionsService } from '../../services/regions.service';

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

  lenguages: HttpResourceRef<Array<Lenguage> | undefined> =
    this.lenguageService.getAll();

  regions: HttpResourceRef<Array<Region> | undefined> =
    this.regionService.getAllResource();

  models: HttpResourceRef<Array<any> | undefined> =
    this.modelService.getAllResource();


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
