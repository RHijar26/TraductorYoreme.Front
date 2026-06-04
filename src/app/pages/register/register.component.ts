import { Component, inject } from '@angular/core';
import { UserService } from '../users/services/users.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InfoModalComponent } from '../../modals/info.modal/info.modal.component';
import { Router, RouterLink } from "@angular/router";
import { IconsConst } from '../../helpers/consts/icons.conts';
import { ModalInfoTypes } from '../../helpers/enums/modal.info.types.enum';
import { take } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styles: ``,
})
export class RegisterComponent {

  
  userService = inject(UserService)
  ngbModal = inject(NgbModal);
  private router = inject(Router)
  
  form = new FormGroup({
    name: new FormControl<string|null>(null, Validators.required),    
    lastName: new FormControl<string|null>(null, Validators.required),  
    secondLastName: new FormControl<string|null>(null, Validators.required),    
    email: new FormControl<string|null>(null, Validators.required),    
    passWord: new FormControl<string|null>(null, Validators.required),     
    confirmPassWord: new FormControl<string|null>(null, Validators.required),    
  });

  comparePassWord() : Boolean{
    const passWord = this.form.get('passWord')?.value ?? '';
    const confirmPassword = this.form.get('confirmPassWord') ?? '';

    return passWord  === confirmPassword;
  }


  register(){
    if(!this.form.valid){            
      this.form.markAllAsTouched();
      return;
    }    

    const payLoad = {
      name: this.form.get('name')?.value,
      lastName: this.form.get('lastName')?.value,
      secondLastName: this.form.get('secondLastName')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('passWord')?.value,
    }
        
    this.userService.register(payLoad).subscribe({
      next: (response) => {

        const modalRef = this.ngbModal.open(InfoModalComponent, {
          size: 'lg',
          centered: true
        });    

        modalRef.componentInstance.message = response.message;       
        modalRef.componentInstance.type = ModalInfoTypes.Succes;          
        
        modalRef.closed
          .pipe(take(1))
          .subscribe(() => {
             this.router.navigate(['/login']);
          }
        );  
      },
    })
  }

  openInfoMOdal(){

  }

}
