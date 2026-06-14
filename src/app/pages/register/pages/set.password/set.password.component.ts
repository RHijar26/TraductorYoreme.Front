import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { take } from 'rxjs';
import { ModalInfoTypes } from '../../../../helpers/enums/modal.info.types.enum';
import { InfoModalComponent } from '../../../../modals/info.modal/info.modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-set-password',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './set.password.component.html',
  styles: ``,
})
export class SetPasswordComponent  implements OnInit{

  form = new FormGroup({    
    passWord: new FormControl<string|null>(null,
      [ 
        Validators.required, 
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)
      ]),     
    confirmPassWord: new FormControl<string|null>(null, Validators.required),    
  });

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private registerService = inject(RegisterService);
  private ngbModal = inject(NgbModal);


  private token = '';
    
  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
   
    if (!token) {
      this.router.navigate(['/']); // Redirige al home si no hay token
    }

    this.token = token!;
  }

  get passwordsMatch(): boolean {
    const pass = this.form.get('passWord')?.value;
    const confirm = this.form.get('confirmPassWord')?.value;

    if(pass === null || confirm === null) {
      return false;
    }

    return pass === confirm && pass !== null;
  }
  
  get hasUpperCase(): boolean {
    const value = this.form.get('passWord')?.value;
    return !!value && /[A-Z]/.test(value);
  }

  get hasNumber(): boolean {
    const value = this.form.get('passWord')?.value;

    console.log('Value:', value);

    return !!value && / *\d/.test(value);
  }

  submit() {
    if(this.form.invalid)
    {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      token: this.token,
      password: this.form.get('passWord')?.value,      
    };

    this.registerService.setPassword(payload).subscribe({
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
            this.router.navigate(['/']);
          }
        );  

     
      }
    });


  }

}

