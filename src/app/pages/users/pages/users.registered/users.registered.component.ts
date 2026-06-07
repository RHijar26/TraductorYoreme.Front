import { Component, inject, signal, effect } from '@angular/core';
import { RegisterService } from '../../../register/services/register.service';
import { GetRegisterResponse } from '../../../register/interfaces/GetRegisterResponse.interface';
import { TransforImgName } from '../../functions/transfor.name';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpResourceRef } from '@angular/common/http';
import { ModalService } from '../../../../services/modal.service';
import { ConfirmModalComponent } from '../../../../modals/confirm.modal/confirm.modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { take } from 'rxjs';

@Component({
  selector: 'app-users-registered',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './users.registered.component.html',
  styles: ``,
})
export class UsersRegisteredComponent {
  private registerService = inject(RegisterService);
    private ngbModal = inject(NgbModal);

  registers = signal<GetRegisterResponse[]>([]);
  isLoading = signal(false);
    
  ngOnInit(): void {
    this.isLoading.set(true);


    this.registerService.getAll().subscribe(registers => {
      this.registers.set(registers);
      this.isLoading.set(false);
    });
  }

  decline(id: number): void {

    const modalRef = this.ngbModal.open(ConfirmModalComponent, {
              size: 'lg',
              centered: true
    });    

    modalRef.componentInstance.title = 'Eliminar';
    modalRef.componentInstance.message = '¿Deseas rechazar este usuario?';

    modalRef.closed
    .pipe(take(1))
    .subscribe((response: any) => {            
      if(response)
        this.registerService.decline(id).subscribe(() => {
        const updatedRegisters = this.registers().filter(register => register.id !== id);
        this.registers.set(updatedRegisters);
    });
    });    
  }

  transforImgName(fullName: string): string {
    return TransforImgName(fullName);
  }
}
