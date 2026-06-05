import { Component, inject, signal, effect } from '@angular/core';
import { RegisterService } from '../../../register/services/register.service';
import { GetRegisterResponse } from '../../../register/interfaces/GetRegisterResponse.interface';
import { TransforImgName } from '../../functions/transfor.name';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpResourceRef } from '@angular/common/http';

@Component({
  selector: 'app-users-registered',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './users.registered.component.html',
  styles: ``,
})
export class UsersRegisteredComponent {
  private registerService = inject(RegisterService);

  registers = signal<GetRegisterResponse[]>([]);

  isLoading = signal(false);
  
  

  ngOnInit(): void {
    this.isLoading.set(true);


    this.registerService.getAll().subscribe(registers => {
      this.registers.set(registers);
      this.isLoading.set(false);
    });
  }


  transforImgName(fullName: string): string {
    return TransforImgName(fullName);
  }
}
